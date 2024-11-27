// @ts-nocheck
//高斯滤波
const gaussianBlur = (canvasInput, canvasOutput, params) => {
  const { kernel, sigmaX, sigmaY } = params;
  let src = cv.imread(canvasInput);
  let dst = new cv.Mat();
  let ksize = new cv.Size(kernel[0], kernel[1]);
  // You can try more different parameters
  cv.GaussianBlur(src, dst, ksize, sigmaX, sigmaY, cv.BORDER_DEFAULT);
  cv.imshow(canvasOutput, dst);
  src.delete();
  dst.delete();
};

// 侵蚀
const erode = (canvasInput, canvasOutput, params) => {
  const { kernel } = params;
  let src = cv.imread(canvasInput);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(kernel[0], kernel[1], cv.CV_8U);
  let anchor = new cv.Point(-1, -1);
  // You can try more different parameters
  cv.erode(
    src,
    dst,
    M,
    anchor,
    1,
    cv.BORDER_CONSTANT,
    cv.morphologyDefaultBorderValue()
  );
  cv.imshow(canvasOutput, dst);
  src.delete();
  dst.delete();
  M.delete();
};

// 膨胀
const dilate = (canvasInput, canvasOutput, params) => {
  const { kernel } = params;
  let src = cv.imread(canvasInput);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(kernel[0], kernel[1], cv.CV_8U);
  let anchor = new cv.Point(-1, -1);
  // You can try more different parameters
  cv.dilate(
    src,
    dst,
    M,
    anchor,
    1,
    cv.BORDER_CONSTANT,
    cv.morphologyDefaultBorderValue()
  );
  cv.imshow(canvasOutput, dst);
  src.delete();
  dst.delete();
  M.delete();
};

// 开运算
const open = (canvasInput, canvasOutput, params) => {
  const { kernel } = params;
  let src = cv.imread(canvasInput);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(kernel[0], kernel[1], cv.CV_8U);
  let anchor = new cv.Point(-1, -1);
  // You can try more different parameters
  cv.morphologyEx(
    src,
    dst,
    cv.MORPH_OPEN,
    M,
    anchor,
    1,
    cv.BORDER_CONSTANT,
    cv.morphologyDefaultBorderValue()
  );
  cv.imshow(canvasOutput, dst);
  src.delete();
  dst.delete();
  M.delete();
};

// 闭运算
const close = (canvasInput, canvasOutput, params) => {
  const { kernel } = params;
  let src = cv.imread(canvasInput);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(kernel[0], kernel[1], cv.CV_8U);
  // You can try more different parameters
  cv.morphologyEx(src, dst, cv.MORPH_CLOSE, M);
  cv.imshow(canvasOutput, dst);
  src.delete();
  dst.delete();
  M.delete();
};

// 形态学梯度
const morphGradient = (canvasInput, canvasOutput, params) => {
  const { kernel } = params;
  let src = cv.imread(canvasInput);
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(kernel[0], kernel[1], cv.CV_8U);
  // You can try more different parameters
  cv.morphologyEx(src, dst, cv.MORPH_GRADIENT, M);
  cv.imshow(canvasOutput, dst);
  src.delete();
  dst.delete();
  M.delete();
};

// 顶帽
const topHat = (canvasInput, canvasOutput, params) => {
  const { kernel } = params;
  let src = cv.imread(canvasInput);
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(kernel[0], kernel[1], cv.CV_8U);
  // You can try more different parameters
  cv.morphologyEx(src, dst, cv.MORPH_TOPHAT, M);
  cv.imshow(canvasOutput, dst);
  src.delete();
  dst.delete();
  M.delete();
};

// 黑帽
const blackHat = (canvasInput, canvasOutput, params) => {
  const { kernel } = params;
  let src = cv.imread(canvasInput);
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(kernel[0], kernel[1], cv.CV_8U);
  // You can try more different parameters
  cv.morphologyEx(src, dst, cv.MORPH_BLACKHAT, M);
  cv.imshow(canvasOutput, dst);
  src.delete();
  dst.delete();
  M.delete();
};

export {
  gaussianBlur,
  erode,
  dilate,
  open,
  close,
  morphGradient,
  topHat,
  blackHat,
};
