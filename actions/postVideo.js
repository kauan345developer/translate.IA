"use server";

export const postVideo = async (file) => {
  const formData = new FormData();
  console.log(file.target.files[0]);
  console.log("aAa")
  formData.append("file", file.target.files[0]);
  try {
    // Esperar a conclusão da solicitação fetch
    const a = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });
    
  } catch (error) {
    console.error("Erro durante o upload:", error);
  }
};

