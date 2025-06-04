export const uploadImage = async (img) => {
  const formData = new FormData();
  formData.append("image", img);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=66c36ebac8cfebbc76676fb0650e9ac5`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  return data?.data?.url;
};
