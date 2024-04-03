import { AssemblyAI } from "assemblyai";
import fs from "fs-extra";
import axios from "axios";

const client = new AssemblyAI({
  apiKey: "ea859b7017d54902add63d7d6163513e",
});

const headers = {
  authorization: 'ea859b7017d54902add63d7d6163513e'
}
async function videoToText(path) {
  //url de Transcrição
  const baseUrl = 'https://api.assemblyai.com/v2'
  //Key de acesso
  // le o arquivo de audio
  const audioData = await fs.readFile(path)
  
  // faz o upload do arquivo de audio para a API
  const uploadResponse = await axios.post(`${baseUrl}/upload`, audioData, {
    headers
  })
  // pega a url do arquivo de audio
  const uploadUrl = uploadResponse.data.upload_url
  
  // seta os dados para a transcrição
  const data = {
    audio_url: uploadUrl,
    language_code: "pt",
  }
  
  //faz a url de transcrição para a API
  const url = `${baseUrl}/transcript`
  // fas a requisição para a API da transcrição para pegar o id
  const response = await axios.post(url, data, { headers: headers })
  
  // pega o id da transcrição
  const transcriptId = response.data.id
  // faz a url de polling para a API
  const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`
  
  //espera a transcrição ser completada
  while (true) {
    const pollingResponse = await axios.get(pollingEndpoint, {
        headers: headers
    })
    const transcriptionResult = pollingResponse.data
  
    if (transcriptionResult.status === 'completed') {
      // console.log(transcriptionResult.text)
      break
    } else if (transcriptionResult.status === 'error') {
      throw new Error(`Transcription failed: ${transcriptionResult.error}`)
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }
  
  return transcriptId
}



async function getSubtitleFile(
  transcriptId,
  fileFormat
) {
  if (!['srt', 'vtt'].includes(fileFormat)) {
    throw new Error(
      `Unsupported file format: ${fileFormat}. Please specify 'srt' or 'vtt'.`
    )
  }
  // const headers = {
  //   authorization: 'ea859b7017d54902add63d7d6163513e'
  // }
  
  const url = `https://api.assemblyai.com/v2/transcript/${transcriptId}/${fileFormat}`

  const response = await axios.get(url, { headers })
  // console.log(response)
  // console.log(response.data)

  try {
    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    throw new Error(
      `Failed to retrieve ${fileFormat.toUpperCase()} file: ${error.response
        ?.status} ${error.response?.data?.error}`
    )
  }
}

// console.log(transcriptId)
// const subtitles = await getSubtitleFile(
//   transcriptId,
//   'vtt' // or srt
// )
// await fs.writeFile('subtitles2.vtt', subtitles)

export { videoToText, getSubtitleFile };
