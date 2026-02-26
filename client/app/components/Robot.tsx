// /**
//  * Dancing Robots - TypeScript Version
//  */

// // --- Interfaces & Types ---
// interface PointConfig {
//     x: number;
//     y: number;
//     f?: (s: number, d: number) => void;
// }

// interface LinkConfig {
//     p0: number;
//     p1: number;
//     size: number;
//     lum: number;
//     force?: number;
//     disk?: number;
// }

// interface RobotStruct {
//     points: PointConfig[];
//     links: LinkConfig[];
// }

// interface Pointer {
//     x: number;
//     y: number;
//     dancerDrag: Robot | null;
//     pointDrag: RobotPoint | null;
// }

// // --- Robot Logic ---
// class Robot {
//     x: number;
//     points: RobotPoint[] = [];
//     links: RobotLink[] = [];
//     frame: number = 0;
//     dir: number = 1;
//     size: number;
//     color: number;
//     light: number;

//     constructor(color: number, light: number, size: number, x: number, y: number, struct: RobotStruct) {
//         this.x = x;
//         this.size = size;
//         this.color = Math.round(color);
//         this.light = light;

//         // Create points
//         for (const p of struct.points) {
//             this.points.push(new RobotPoint(size * p.x + x, size * p.y + y, p.f));
//         }

//         // Create links
//         for (const link of struct.links) {
//             const p0 = this.points[link.p0];
//             const p1 = this.points[link.p1];
//             const dx = p0.x - p1.x;
//             const dy = p0.y - p1.y;
//             this.links.push(
//                 new RobotLink(
//                     this,
//                     p0,
//                     p1,
//                     Math.sqrt(dx * dx + dy * dy),
//                     (link.size * size) / 3,
//                     link.lum,
//                     link.force,
//                     link.disk
//                 )
//             );
//         }
//     }

//     update(canvasHeight: number, ground: number, pointer: Pointer, ts: number): void {
//         if (++this.frame % Math.round(20 / ts) === 0) this.dir = -this.dir;

//         for (const link of this.links) link.update();
//         for (const point of this.points) point.update(this, pointer, ts);

//         // Ground collision
//         for (const link of this.links) {
//             const p1 = link.p1;
//             if (p1.y > canvasHeight * ground - link.size * 0.5) {
//                 p1.y = canvasHeight * ground - link.size * 0.5;
//                 p1.x -= p1.vx;
//                 p1.vx = 0;
//                 p1.vy = 0;
//             }
//         }
//         this.points[3].x += (this.x - this.points[3].x) * 0.001;
//     }

//     draw(ctx: CanvasRenderingContext2D): void {
//         for (const link of this.links) {
//             if (link.size) {
//                 const dx = link.p1.x - link.p0.x;
//                 const dy = link.p1.y - link.p0.y;
//                 const a = Math.atan2(dy, dx);

//                 // Shadow
//                 ctx.save();
//                 ctx.translate(link.p0.x + link.size * 0.25, link.p0.y + link.size * 0.25);
//                 ctx.rotate(a);
//                 ctx.drawImage(link.shadow, -link.size * 0.5, -link.size * 0.5);
//                 ctx.restore();

//                 // Stroke
//                 ctx.save();
//                 ctx.translate(link.p0.x, link.p0.y);
//                 ctx.rotate(a);
//                 ctx.drawImage(link.image, -link.size * 0.5, -link.size * 0.5);
//                 ctx.restore();
//             }
//         }
//     }
// }

// class RobotLink {
//     p0: RobotPoint;
//     p1: RobotPoint;
//     distance: number;
//     size: number;
//     light: number;
//     force: number;
//     image: HTMLCanvasElement | OffscreenCanvas;
//     shadow: HTMLCanvasElement | OffscreenCanvas;

//     constructor(parent: Robot, p0: RobotPoint, p1: RobotPoint, dist: number, size: number, light: number, force: number = 0.5, disk?: number) {
//         this.p0 = p0;
//         this.p1 = p1;
//         this.distance = dist;
//         this.size = size;
//         this.light = light || 1.0;
//         this.force = force;

//         const colorStr = `hsl(${parent.color}, 30%, ${parent.light * this.light}%)`;
//         this.image = this.createStroke(colorStr, true, disk, dist, size);
//         this.shadow = this.createStroke("rgba(0,0,0,0.5)", false, disk, dist, size);
//     }

//     update(): void {
//         const dx = this.p1.x - this.p0.x;
//         const dy = this.p1.y - this.p0.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist > 0.0) {
//             const tw = this.p0.w + this.p1.w;
//             const r1 = this.p1.w / tw;
//             const r0 = this.p0.w / tw;
//             const dz = (this.distance - dist) * this.force;
//             const sx = (dx / dist) * dz;
//             const sy = (dy / dist) * dz;
//             this.p1.x += sx * r0;
//             this.p1.y += sy * r0;
//             this.p0.x -= sx * r1;
//             this.p0.y -= sy * r1;
//         }
//     }

//     private createStroke(color: string, axis: boolean, disk: number | undefined, dist: number, size: number): HTMLCanvasElement | OffscreenCanvas {
//         const width = dist + size;
//         const height = size;
//         const canvas = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(width, height) : document.createElement("canvas");
        
//         if (canvas instanceof HTMLCanvasElement) {
//             canvas.width = width;
//             canvas.height = height;
//         }

//         const ict = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
//         ict.beginPath();
//         ict.lineCap = "round";
//         ict.lineWidth = size;
//         ict.strokeStyle = color;

//         if (disk) {
//             ict.arc(size * 0.5 + dist, size * 0.5, size * 0.5, 0, 2 * Math.PI);
//             ict.fillStyle = color;
//             ict.fill();
//         } else {
//             ict.moveTo(size * 0.5, size * 0.5);
//             ict.lineTo(size * 0.5 + dist, size * 0.5);
//             ict.stroke();
//         }

//         if (axis) {
//             const s = size / 10;
//             ict.fillStyle = "#000";
//             ict.fillRect(size * 0.5 - s, size * 0.5 - s, s * 2, s * 2);
//             ict.fillRect(size * 0.5 - s + dist, size * 0.5 - s, s * 2, s * 2);
//         }
//         return canvas;
//     }
// }

// class RobotPoint {
//     x: number;
//     y: number;
//     px: number;
//     py: number;
//     vx: number = 0;
//     vy: number = 0;
//     w: number;
//     fn: ((s: number, d: number) => void) | null;

//     constructor(x: number, y: number, fn?: (s: number, d: number) => void, w: number = 0.5) {
//         this.x = x;
//         this.y = y;
//         this.px = x;
//         this.py = y;
//         this.w = w;
//         this.fn = fn || null;
//     }

//     update(robot: Robot, pointer: Pointer, ts: number): void {
//         if (robot === pointer.dancerDrag && this === pointer.pointDrag) {
//             this.x += (pointer.x - this.x) * 0.1;
//             this.y += (pointer.y - this.y) * 0.1;
//         }

//         if (robot !== pointer.dancerDrag && this.fn) {
//             this.fn(16 * Math.sqrt(robot.size), robot.dir);
//         }

//         this.vx = this.x - this.px;
//         this.vy = this.y - this.py;
//         this.px = this.x;
//         this.py = this.y;
//         this.vx *= 0.995;
//         this.vy *= 0.995;
//         this.x += this.vx;
//         this.y += this.vy + 0.01 * ts;
//     }
// }


"use client";
import React, { useRef, useEffect } from 'react';


const DancingRobots = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        const render = () => {
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ width: '100%', height: '100%', background: '#000' }} 
        />
    );
};

export default DancingRobots;