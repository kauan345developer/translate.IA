"use client";

// import { postVideo } from "@/actions/postVideo";

function InputFile() {
  const postVideo = async (file) => {
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
      console.log(a);
      console.log(await a.json());
      console.log("Upload concluído com sucesso");
    } catch (error) {
      console.error("Erro durante o upload:", error);
    }
  };
  
  return (
    <div>
      <input type="file" onChange={(e) => {postVideo(e)}} />
    </div>
  );
}

export default InputFile;
