import InputFile from "@/components/inputFile";
// import video from "./chiclete.mp4";
import { Video } from "@/components/video";
export default function Home() {
  return (
    <div className="h-full">
      <div className="w-full grid place-items-center h-14 border border-color2">
        <h1 className="text-2xl font-semibold text-gray-700 hover:text-red-600">
          Melhor site para Para aprender Ingles com videos
        </h1>
      </div>
      <div className="flex items-center justify-center border border-blue-500 h-full">
        <form className="">
          <InputFile />
        </form>
        {/* <Video /> */}
        {/* <video controls >
          <source src="./video.mp4"/>
        </video> */}
        {/* <video src="app/chiclete.mp4"></video> */}
      </div>
    </div>
  );
}
