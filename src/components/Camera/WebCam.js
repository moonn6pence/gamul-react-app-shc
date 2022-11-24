import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

function WebCam() {
  const [img, setImg] = useState(null);
  const [formdata, setFormData] = useState(null);

  const webcamRef = useRef(null);

  const videoConstraints = {
    //후면카메라 설정
    facingMode: { exact: "environment" },
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  const getWebcam = () => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  //base64를 Blob 오브젝트로 만드는 함수
  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    if (b64Data === "" || b64Data === undefined) return;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  //파일 base64 형식에서 File 형식으로 디코딩 변환
  const convertBase64IntoFile = (image, fileName) => {
    const mimeType = image?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]; // image/jpeg
    const realData = image.split(",")[1]; // 이 경우에선 /9j/4AAQSkZJRgABAQAAAQABAAD...

    const blob = b64toBlob(realData, mimeType);
    const raw = new File([blob], fileName, { type: mimeType });

    const fileList = [{ name: raw.name, size: raw.size, uid: 1, raw }];
    return fileList;
  };

  const sendImage = () => {
    setFormData(convertBase64IntoFile(img, "object.jpeg"));

    console.log(formdata);

    // axios 요청 보내기
  };

  useEffect(() => {
    getWebcam();
  }, []);

  return (
    <div className="Container">
      {img === null ? (
        <>
          {/* <TestOverlay /> */}
          <Webcam
            style={{ width: "338px", height: "496px" }}
            imageSmoothing={true}
            screenshotFormat="image/jpg"
            ref={webcamRef}
            // videoConstraints={videoConstraints} //후면 카메라 사용
          />
          <div>
            <Button onClick={capture}>Capture photo</Button>
          </div>
        </>
      ) : (
        <>
          <img
            src={img}
            alt="screenshot"
            style={{ width: "338px", height: "auto" }}
          />

          <div>
            <Button onClick={() => setImg(null)}>Retake</Button>
          </div>

          <div>
            <Button onClick={sendImage}>전송하기</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default WebCam;