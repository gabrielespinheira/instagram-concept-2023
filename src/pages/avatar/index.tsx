import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { FiImage } from 'react-icons/fi'

import { useAtom, sessionAtom } from 'src/atoms'
import { BasicTemplate } from 'src/components'

const AvatarPage: NextPage = () => {
  const router = useRouter()
  const inputFileRef = useRef<any>()
  const [file, setFile] = useState<any>()
  const [fileName, setFileName] = useState<string>('Select an image')
  const [image, setImage] = useState<string>()
  const [session, _] = useAtom(sessionAtom)

  async function getBase64(file) {
    return new Promise((resolve) => {
      let baseURL: any = ''
      let reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {
        baseURL = reader.result
        resolve(baseURL)
      }
    })
  }

  async function handleChangeFile(e) {
    const files = e.target.files
    setFile(files)
    if (files[0] && files[0].name) {
      setFileName(files[0].name)
      setImage(URL.createObjectURL(files[0]))
    } else {
      setFileName('Select an image')
      setImage(undefined)
    }
  }

  async function handleUpload(e) {
    e.preventDefault()

    if (file && file.length > 0 && session && session.token) {
      const base64 = await getBase64(file[0])

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/avatar`,
          {
            method: 'POST',
            body: JSON.stringify({
              stream: base64,
            }),
            headers: {
              Authorization: 'Bearer ' + session.token,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        )
        const json = await res.json()

        if (!json.upload) {
          console.log('error', json)
        }

        setTimeout(() => {
          router.push(`/${session.user.username}`)
        }, 10000)

        return
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  return (
    <BasicTemplate>
      <h1
        className="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter"
        data-aos="zoom-y-out"
      >
        <span className="bg-clip-text text-transparent gradient pl-2 pr-2">
          Upload your Profile Picture
        </span>
      </h1>

      <form
        onSubmit={handleUpload}
        className="flex flex-col mt-12 gap-2 w-[420px]"
      >
        <input
          type="file"
          ref={inputFileRef}
          onChange={(e) => handleChangeFile(e)}
          multiple={false}
          accept=".jpg, .jpeg, .png"
          className="hidden"
        />

        <button
          className="input !flex flex-row justify-center items-center gap-4"
          onClick={(e) => inputFileRef.current.click()}
        >
          <FiImage size={24} />
          <span>{fileName}</span>
        </button>

        <div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="Preview" className="w-full rounded-sm" />
          )}
        </div>

        <button
          type="submit"
          className={`btn group relative mt-4 flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium bg-indigo-600 hover:bg-indigo-800 `}
          onClick={handleUpload}
        >
          Update picture
        </button>
      </form>
    </BasicTemplate>
  )
}

export default AvatarPage
