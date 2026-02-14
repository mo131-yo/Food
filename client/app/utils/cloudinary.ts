export const getCloudinaryUrl = (publicId: string) => {
  // 1. Хэрэв ID байхгүй бол саарал зураг харуулна
  if (!publicId) return "https://via.placeholder.com/500?text=No+ID";

  // 2. Хэрэв санамсаргүйгээр бүтэн URL ороод ирвэл (Pinterest-ийн үлдэгдэл гэх мэт)
  if (publicId.startsWith('http')) return publicId;

  const cloudName = "таны_cloud_name"; // <--- Энийг заавал солиорой!

  /**
   * Senior-ын тайлбар:
   * f_auto: Хөтөчид тохирох хамгийн хөнгөн форматыг сонгоно.
   * q_auto: Чанарыг нь хүний нүдэнд мэдэгдэхгүйгээр багасгаж хэмжээг хэмнэнэ.
   * c_fill, w_600, h_400: Зургийг заасан хэмжээнд гоёор тааруулж зүснэ.
   */
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_fill,w_600,h_400/${publicId}`;
};