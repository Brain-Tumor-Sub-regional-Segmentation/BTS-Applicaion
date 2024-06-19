import React, { useState, useEffect, useRef } from "react";

import FrameComponent from "../components/FrameComponent";
import styles from "./Process.module.css";
import * as nifti from "nifti-reader-js";
import { decompressSync } from "fflate";
const ProcessRefactor = () => {
  const canvasRef1 = useRef(null);
  const canvasRef1Tumor = useRef(null);

  const canvasRef2 = useRef(null);
  const canvasRef2Tumor = useRef(null);

  const canvasRef3 = useRef(null);
  const canvasRef3Tumor = useRef(null);

  const [slice, setSlice] = useState(0);
  const [dims, setDims] = useState([]);
  const [canvasImageData1, setCanvasImageData1] = useState();
  const [arr3d, setArr3d] = useState([]);
  const [arr3dTumor, setArr3dTumor] = useState([]);
  function getTypedData(niftiHeader, niftiImage) {
    var typedData;
    if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_UINT8) {
      typedData = new Uint8Array(niftiImage);
    } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_INT16) {
      typedData = new Int16Array(niftiImage);
    } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_INT32) {
      typedData = new Int32Array(niftiImage);
    } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_FLOAT32) {
      typedData = new Float32Array(niftiImage);
    } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_FLOAT64) {
      typedData = new Float64Array(niftiImage);
    } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_INT8) {
      typedData = new Int8Array(niftiImage);
    } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_UINT16) {
      typedData = new Uint16Array(niftiImage);
    } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_UINT32) {
      typedData = new Uint32Array(niftiImage);
    } else {
      return;
    }
    console.log(typedData);
    return typedData;
  }
  function setCanvasSizes(niftiHeader) {
    console.log(niftiHeader);
    var canvas1 = document.getElementById("myCanvas1");
    var canvas2 = document.getElementById("myCanvas2");
    var canvas3 = document.getElementById("myCanvas3");
    canvas1.width = niftiHeader.dims[1];
    canvas1.height = niftiHeader.dims[2];
    canvas2.width = niftiHeader.dims[2];
    canvas2.height = niftiHeader.dims[3];
    canvas3.width = niftiHeader.dims[3];
    canvas3.height = niftiHeader.dims[1];
    setSlice(niftiHeader.dims[3] / 2);
  }
  function convertTo3d(typedData, input) {
    let index = 0;
    const depth = dims[3];
    const height = dims[2];
    const width = dims[1];
    for (let d = 0; d < depth; d++) {
      let depthArray = [];
      for (let h = 0; h < height; h++) {
        let rowArray = [];
        for (let w = 0; w < width; w++) {
          rowArray.push(typedData[index]);
          index++;
        }
        depthArray.push(rowArray);
      }
      input.push(depthArray);
    }
  }
  function readNIFTI(data) {
    console.log(data);

    var niftiHeader, niftiImage;

    if (nifti.isCompressed(data)) {
      data = decompressSync(new Uint8Array(data)).buffer;
    }
    if (nifti.isNIFTI(data)) {
      niftiHeader = nifti.readHeader(data);
      setCanvasSizes(niftiHeader);
      niftiImage = nifti.readImage(niftiHeader, data);
      var typedData = getTypedData(niftiHeader, niftiImage);
      console.log(typedData);
      if (typedData === undefined) {
        return;
      }

      niftiHeader.dims.map((dim) => dims.push(dim));
      if (arr3d.length === 0) {
        convertTo3d(typedData, arr3d);
        console.log(arr3d);
      } else {
        convertTo3d(typedData, arr3dTumor);
        console.log(arr3dTumor);
      }
      // draw slices
      drawCanvas(canvasRef1.current, slice, 1);
      drawCanvas(canvasRef2.current, slice, 2);
      drawCanvas(canvasRef3.current, slice, 3);
    }
  }
  function firstDimesion(canvas, sliceIndex) {
    if(arr3dTumor.length === 0){
      return 0;
    }
    const seg = arr3dTumor.length > 0;
    console.log(seg);
    let ctxTumor;
    let newTumorImg;
    let flattenedSliceTumor;
    if (seg) {
      const segmenetedCanvas = canvasRef1Tumor.current;
      ctxTumor = segmenetedCanvas.getContext("2d");

      segmenetedCanvas.width = dims[1];

      segmenetedCanvas.height = dims[2];
      newTumorImg = ctxTumor.createImageData(canvas.width, canvas.height);
      flattenedSliceTumor = arr3dTumor[sliceIndex].flat();
    }
    // Take a slice at the first dimension (depth)
    const sliced3d = arr3d[sliceIndex];
    console.log(sliced3d.length, sliced3d[0].length);
    // Flatten the 2D slice array
    const flattenedSlice = sliced3d.flat();

    // Get canvas context and image data
    const ctx = canvas.getContext("2d");
    let newCanvasImageData1 = ctx.createImageData(canvas.width, canvas.height);

    // Manipulate the canvas image data directly
    flattenedSlice.forEach((value, index) => {
      /*
         Assumes data is 8-bit. If not, adjust the value range accordingly.
         You may also need to apply scaling, normalization, or other transformations.
       */
      newCanvasImageData1.data[index * 4] = value & 0xff; // Red channel
      newCanvasImageData1.data[index * 4 + 1] = value & 0xff; // Green channel
      newCanvasImageData1.data[index * 4 + 2] = value & 0xff; // Blue channel
      newCanvasImageData1.data[index * 4 + 3] = 0xff; // Alpha channel (fully opaque)
      if (seg) {
        newTumorImg.data[index * 4] = value & 0xff; // Red channel
        newTumorImg.data[index * 4 + 1] = value & 0xff; // Green channel
        newTumorImg.data[index * 4 + 2] = value & 0xff; // Blue channel
        newTumorImg.data[index * 4 + 3] = 0xff; // Alpha channel (fully opaque)
        if (flattenedSliceTumor[index] === 0) {
        } else if (flattenedSliceTumor[index] == 1) {
          newTumorImg.data[index * 4] = 0xff; // Red channel
          newTumorImg.data[index * 4 + 1] = 0; // Green channel
          newTumorImg.data[index * 4 + 2] = 0; // Blue channel
          newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
        } else if (flattenedSliceTumor[index] == 2) {
          newTumorImg.data[index * 4] = 0; // Red channel
          newTumorImg.data[index * 4 + 1] = 0xff; // Green channel
          newTumorImg.data[index * 4 + 2] = 0; // Blue channel
          newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
        } else {
          newTumorImg.data[index * 4] = 0; // Red channel
          newTumorImg.data[index * 4 + 1] = 0; // Green channel
          newTumorImg.data[index * 4 + 2] = 0xff; // Blue channel
          newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
        }
      }
    });
    // Create an image element

    const img = document.createElement("img");
    ctx.putImageData(newCanvasImageData1, 0, 0);
    if (seg) {
      ctxTumor.putImageData(newTumorImg, 0, 0);
    }
    setCanvasImageData1(newCanvasImageData1);
    const dataURL = canvas.toDataURL();
    img.src = dataURL; // Set the data URL as the source of the image
    console.log(img);
    // Append the image element to the document body or any other desired location
    // Add event listener to track mouse movement
    document.body.appendChild(img);
  }
  function secondDimesion(canvas, sliceIndex) {
    const ctx = canvas.getContext("2d");
    canvas.width = dims[2];
    canvas.height = dims[3];
    let seg = arr3dTumor.length > 0;
    let ctxTumor;
    let newTumorImg;
    const segmenetedCanvas = canvasRef2Tumor.current;
    if (seg) {
      console.log(segmenetedCanvas);
      segmenetedCanvas.width = dims[2];
      segmenetedCanvas.height = dims[3];
      ctxTumor = segmenetedCanvas.getContext("2d");
      newTumorImg = ctxTumor.createImageData(canvas.width, canvas.height);
    }
    console.log(typeof dims[2], typeof dims[3]);
    const canvasImageData = ctx.createImageData(
      parseInt(dims[2]),
      parseInt(dims[3])
    );
    // Iterate through the 3D array and draw the specified slice on the canvas
    for (let y = 0; y < arr3d.length; y++) {
      let outerArrayTumor;
      if (seg) {
        outerArrayTumor = arr3dTumor[y];
      }
      const outerArray = arr3d[y];
      for (let x = 0; x < outerArray.length; x++) {
        const innerArray = outerArray[x];
        let innerArrayTumor;
        let tumorValue;
        if (seg) {
          innerArrayTumor = outerArrayTumor[x];
          tumorValue = innerArrayTumor[sliceIndex];
        }
        const value = innerArray[sliceIndex]; // Get value from the specified slice
        const index = y * canvas.width + x; // Calculate index for canvasImageData.data

        // Set pixel color
        canvasImageData.data[index * 4] = value & 0xff; // Red channel
        canvasImageData.data[index * 4 + 1] = value & 0xff; // Green channel
        canvasImageData.data[index * 4 + 2] = value & 0xff; // Blue channel
        canvasImageData.data[index * 4 + 3] = 0xff; // Alpha channel (fully opaque)
        if (seg) {
          newTumorImg.data[index * 4] = value & 0xff; // Red channel
          newTumorImg.data[index * 4 + 1] = value & 0xff; // Green channel
          newTumorImg.data[index * 4 + 2] = value & 0xff; // Blue channel
          newTumorImg.data[index * 4 + 3] = 0xff; // Alpha channel (fully opaque)
          if (tumorValue === 0) {
          } else if (tumorValue == 1) {
            newTumorImg.data[index * 4] = 0xff; // Red channel
            newTumorImg.data[index * 4 + 1] = 0; // Green channel
            newTumorImg.data[index * 4 + 2] = 0; // Blue channel
            newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
          } else if (tumorValue == 2) {
            newTumorImg.data[index * 4] = 0; // Red channel
            newTumorImg.data[index * 4 + 1] = 0xff; // Green channel
            newTumorImg.data[index * 4 + 2] = 0; // Blue channel
            newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
          } else {
            newTumorImg.data[index * 4] = 0; // Red channel
            newTumorImg.data[index * 4 + 1] = 0; // Green channel
            newTumorImg.data[index * 4 + 2] = 0xff; // Blue channel
            newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
          }
        }
      }
    }
    // console.log(canvas.width, canvas.height);
    ctx.putImageData(canvasImageData, 0, 0);
    if (seg) {
      ctxTumor.putImageData(newTumorImg, 0, 0);
      const imgTumor = document.getElementById("canvas22Tumor");
      const dataURLTumor = segmenetedCanvas.toDataURL();
      imgTumor.src = dataURLTumor; // Set the data URL as the source of the image
    }
    const img1 = document.getElementById("canvas22");

    const dataURL = canvas.toDataURL();
    img1.src = dataURL; // Set the data URL as the source of the image
  }
  function thirdDimesion(canvas, sliceIndex) {
    const ctx = canvas.getContext("2d");

    console.log(parseInt(sliceIndex));
    canvas.width = dims[3];
    canvas.height = dims[1];
    const seg = arr3dTumor.length > 0;
    let ctxTumor;
    let newTumorImg;
    const segmenetedCanvas = canvasRef3Tumor.current;
    if (seg) {
      console.log(segmenetedCanvas);
      segmenetedCanvas.width = dims[3];
      segmenetedCanvas.height = dims[1];
      ctxTumor = segmenetedCanvas.getContext("2d");
      newTumorImg = ctxTumor.createImageData(canvas.width, canvas.height);
    }
    console.log(dims);
    const canvasImageData = ctx.createImageData(dims[3], dims[1]);

    for (let i = 0; i < arr3d.length; i++) {
      for (let j = 0; j < arr3d[0][0].length; j++) {
        const index = j * canvas.width + i;
        var value = arr3d[i][sliceIndex][j];
        // console.log(value);
        canvasImageData.data[index * 4] = value & 0xff; // Red channel
        canvasImageData.data[index * 4 + 1] = value & 0xff; // Green channel
        canvasImageData.data[index * 4 + 2] = value & 0xff; // Blue channel
        canvasImageData.data[index * 4 + 3] = 0xff; // Alpha channel (fully opaque)
        if (seg) {
          var tumorValue = arr3dTumor[i][sliceIndex][j];
          newTumorImg.data[index * 4] = value & 0xff; // Red channel
          newTumorImg.data[index * 4 + 1] = value & 0xff; // Green channel
          newTumorImg.data[index * 4 + 2] = value & 0xff; // Blue channel
          newTumorImg.data[index * 4 + 3] = 0xff; // Alpha channel (fully opaque)
          if (tumorValue === 0) {
          } else if (tumorValue == 1) {
            newTumorImg.data[index * 4] = 0xff; // Red channel
            newTumorImg.data[index * 4 + 1] = 0; // Green channel
            newTumorImg.data[index * 4 + 2] = 0; // Blue channel
            newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
          } else if (tumorValue == 2) {
            newTumorImg.data[index * 4] = 0; // Red channel
            newTumorImg.data[index * 4 + 1] = 0xff; // Green channel
            newTumorImg.data[index * 4 + 2] = 0; // Blue channel
            newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
          } else {
            newTumorImg.data[index * 4] = 0; // Red channel
            newTumorImg.data[index * 4 + 1] = 0; // Green channel
            newTumorImg.data[index * 4 + 2] = 0xff; // Blue channel
            newTumorImg.data[index * 4 + 3] = 0xf0; // Alpha channel (fully opaque)
          }
        }
      }
    }
    console.log(canvasImageData);
    if (seg) {
      ctxTumor.putImageData(newTumorImg, 0, 0);
      const imgTumor = document.getElementById("canvas33Tumor");
      const dataURLTumor = segmenetedCanvas.toDataURL();
      imgTumor.src = dataURLTumor; // Set the data URL as the source of the image
    }
    ctx.putImageData(canvasImageData, 0, 0);
    const img1 = document.getElementById("canvas33");

    const dataURL = canvas.toDataURL();
    img1.src = dataURL; // Set the data URL as the source of the image
    console.log(img1);
    // console.log(canvasImageData);
    // document.body.appendChild(img1);
  }
  function drawCanvas(canvas, slice, index) {
    console.log(arr3d);

    const sliceIndex = parseInt(slice);
    console.log(slice);

    if (index === 1) {
      firstDimesion(canvas, sliceIndex, dims);
    } else if (index === 2) {
      secondDimesion(canvas, sliceIndex, dims);
    } else {
      thirdDimesion(canvas, sliceIndex, dims);
    }
  }

  function makeSlice(file, start, length) {
    var fileType = typeof File;

    if (fileType === "undefined") {
      return function () {};
    }

    if (File.prototype.slice) {
      return file.slice(start, start + length);
    }

    if (File.prototype.mozSlice) {
      return file.mozSlice(start, length);
    }

    if (File.prototype.webkitSlice) {
      return file.webkitSlice(start, length);
    }

    return null;
  }

  function readFile(file) {
    if (file === undefined) {
      return;
    }
    console.log(file);
    var blob = makeSlice(file, 0, file.size);

    var reader = new FileReader();

    reader.onloadend = function (evt) {
      console.log(evt.target);
      if (evt.target.readyState === FileReader.DONE) {
        console.log(file.name, evt.target.result);
        readNIFTI(evt.target.result);
      }
    };

    reader.readAsArrayBuffer(blob);
  }

  function handleFileSelect(evt) {
    const files = evt.target.files;
    readFile(files[0]);
  }
  function clickedCanvas(event) {
    if(arr3dTumor.length === 0){
      return;
    }
    const canvas1Object = canvasRef1.current;
    var ctx = canvas1Object.getContext("2d");

    const rect = canvas1Object.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / 300.0) * dims[1];
    const y = ((event.clientY - rect.top) / 300.0) * dims[2];
    console.log(x, y);
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas1Object.width, canvas1Object.height);
    console.log(canvasImageData1);
    ctx.putImageData(canvasImageData1, 0, 0);
    const rotatedX = canvas1Object.width - x;
    const rotatedY = canvas1Object.height - y;
    console.log(rotatedX, rotatedY);
    ctx.beginPath();
    ctx.moveTo(0, rotatedY);
    ctx.lineTo(canvas1Object.width, rotatedY);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rotatedX, canvas1Object.height);
    ctx.lineTo(rotatedX, 0);
    ctx.strokeStyle = "white";
    ctx.stroke();
    console.log(canvas1Object.width, canvas1Object.height);
    drawOtherCanvas(rotatedX, rotatedY, dims);
  }
  function drawOtherCanvas(rotatedX, rotatedY, dims) {
    drawCanvas(canvasRef2.current, rotatedX, 2, arr3d, dims);
    drawCanvas(canvasRef3.current, rotatedY, 3, arr3d, dims);
  }
  function handleSliceChange(event) {
    if (event.target.id === "add") {
      setSlice(slice + 1);
      drawCanvas(canvasRef1.current, slice, 1, arr3d, dims);
    }
    if (event.target.id === "minus") {
      setSlice(slice - 1);
      drawCanvas(canvasRef1.current, slice, 1, arr3d, dims);
    }
  }
  return (
    <div className={styles.process}>


      <section className={styles.processDateWrapper}>

        <div className={styles.processDate}>
          <FrameComponent />
          <div className={styles.fRAMEAParent}>
          <input type="file" onChange={handleFileSelect} id="zoomIn" multiple />

            <div className={styles.fRAMEA}>
              <div className={styles.fRAMEB}>
                <div className={styles.mriWrapper}>
                  <b className={styles.mriText}>MRI</b>
                </div>
                <div className={styles.mriWrapper}>
                  <b className={styles.mriText}>Segmented MRI</b>
                </div>
              </div>
            </div>
            <div className={styles.frameParent}>
              <div className={styles.container}>
                <div className={styles.frameGroup}>
                  <div className={styles.frameContainer}>
                    <img
                      className={styles.frameInner}
                      alt=""
                      src="/group-11@2x.png"
                    />
                    <canvas
                      id="myCanvas1"
                      ref={canvasRef1}
                      // width="100"
                      // height="100"
                      className={styles.frameInner}
                      style={{ transform: "rotate(180deg)" }}
                      onClick={(evt) => clickedCanvas(evt)}
                    ></canvas>
                    <img
                      className={styles.MinusSquareIcon}
                      alt=""
                      src="/add-square.svg"
                      onClick={handleSliceChange}
                      id="minus"
                    />
                    <img
                      className={styles.AddSquareIcon}
                      alt=""
                      src="/add-square-1.svg"
                      onClick={handleSliceChange}
                      id="add"
                    />
                  </div>
                  <div className={styles.image9Parent}>
                    <img
                      className={styles.image9Icon1}
                      alt=""
                      src="/image-9-1@2x.png"
                      id="canvas22"
                      style={{
                        transform: "rotate(180deg)",
                      }}
                    />
                    <canvas
                      id="myCanvas2"
                      ref={canvasRef2}
                      width="100"
                      height="100"
                      // className={styles.image9Icon1}
                      style={{
                        transform: "rotate(180deg)",
                        display: "none",
                        //  scale(.5)", // Example scaling factor of 2
                      }}
                    ></canvas>
                    <div className={styles.rotatedImgContainer}>
                      <img
                        className={styles.image10Icon}
                        loading="lazy"
                        alt=""
                        src="/image-10@2x.png"
                        id="canvas33"
                      />
                      <canvas
                        // className={styles.image10Icon}
                        ref={canvasRef3}
                        id="myCanvas3"
                        width="100"
                        height="100"
                        style={{ transform: "rotate(180deg)", display: "none" }}
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.container}>
                <div className={styles.frameGroup}>
                  <div className={styles.frameContainer}>
                    <img
                      className={styles.frameInner}
                      loading="lazy"
                      alt=""
                      src="/image-8@2x.png"
                      style={{ transform: "rotate(270deg)" }}
                    />
                    <canvas
                      id="myCanvas1Tumor"
                      ref={canvasRef1Tumor}
                      // width="100"
                      // height="100"
                      className={styles.frameInner}
                      style={{ transform: "rotate(180deg)" }}
                    ></canvas>
                  </div>
                  <div className={styles.image9Parent}>
                    <img
                      className={styles.image9Icon1}
                      alt=""
                      src="/image-11@2x.png"
                      id="canvas22Tumor"
                      style={{
                        transform: "rotate(180deg)",
                      }}
                    />
                    <canvas
                      id="myCanvas2Tumor"
                      ref={canvasRef2Tumor}
                      width="100"
                      height="100"
                      // className={styles.image9Icon1}
                      style={{
                        transform: "rotate(180deg)",
                        display: "none",
                        //  scale(.5)", // Example scaling factor of 2
                      }}
                    ></canvas>
                    <div className={styles.rotatedImgContainer}>
                      <img
                        className={styles.image10Icon}
                        loading="lazy"
                        alt=""
                        src="/image-12@2x.png"
                        id="canvas33Tumor"
                        style={{ transform: "rotate(270deg)" }}
                      />
                      <canvas
                        // className={styles.image10Icon}
                        ref={canvasRef3Tumor}
                        id="myCanvas3Tumor"
                        width="100"
                        height="100"
                        style={{ transform: "rotate(270deg)", display: "none" }}
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessRefactor;
