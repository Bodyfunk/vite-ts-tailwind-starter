import * as lamejs from "lamejs";
import MPEGMode from "lamejs/src/js/MPEGMode";
import Lame from "lamejs/src/js/Lame";
import BitStream from "lamejs/src/js/BitStream";

window.MPEGMode = MPEGMode;
window.Lame = Lame;
window.BitStream = BitStream;
/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time
        .replace(new RegExp(/-/gm), "/")
        .replace("T", " ")
        .replace(new RegExp(/\.[\d]{3}/gm), "");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params;
  search.params =
    typeof search.params === "object" &&
    search.params !== null &&
    !Array.isArray(search.params)
      ? search.params
      : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof propName === "undefined") {
    search.params["beginTime"] = dateRange[0];
    search.params["endTime"] = dateRange[1];
  } else {
    search.params["begin" + propName] = dateRange[0];
    search.params["end" + propName] = dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return "";
  }
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value == "" + value) {
      actions.push(datas[key].label);
      return true;
    }
  });
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join("");
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  if (value === undefined || value.length === 0) {
    return "";
  }
  if (Array.isArray(value)) {
    value = value.join(",");
  }
  var actions = [];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    var match = false;
    Object.keys(datas).some((key) => {
      if (datas[key].value == "" + temp[val]) {
        actions.push(datas[key].label + currentSeparator);
        match = true;
      }
    });
    if (!match) {
      actions.push(temp[val] + currentSeparator);
    }
  });
  return actions.join("").substring(0, actions.join("").length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === "undefined") {
      flag = false;
      return "";
    }
    return arg;
  });
  return flag ? str : "";
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}

// 数据合并
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p]);
      } else {
        source[p] = target[p];
      }
    } catch (e) {
      source[p] = target[p];
    }
  }
  return source;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children",
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

// 返回项目路径
export function getNormalPath(p) {
  if (p.length === 0 || !p || p == "undefined") {
    return p;
  }
  let res = p.replace("//", "/");
  if (res[res.length - 1] === "/") {
    return res.slice(0, res.length - 1);
  }
  return res;
}

// 验证是否为blob格式
export function blobValidate(data) {
  return data.type !== "application/json";
}

export function base64ToBlob(base64, type = "application/octet-stream") {
  // 去掉 base64 字符串的前缀部分
  const byteString = atob(base64.split(",")[1]);
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];

  // 将 byteString 转换为 Uint8Array
  const ab = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ab[i] = byteString.charCodeAt(i);
  }

  // 创建 Blob 对象
  return new Blob([ab], { type: mimeString || type });
}

// Convert AudioBuffer to a Blob using WAVE representation
export function bufferToWave(abuffer, len) {
  var numOfChan = abuffer.numberOfChannels,
    length = Math.floor(len * numOfChan * 2 + 44),
    buffer = new ArrayBuffer(length),
    view = new DataView(buffer),
    channels = [],
    i,
    sample,
    offset = 0,
    pos = 0;

  // write WAVE header
  // "RIFF"
  setUint32(0x46464952);
  // file length - 8
  setUint32(length - 8);
  // "WAVE"
  setUint32(0x45564157);
  // "fmt " chunk
  setUint32(0x20746d66);
  // length = 16
  setUint32(16);
  // PCM (uncompressed)
  setUint16(1);
  setUint16(numOfChan);
  setUint32(abuffer.sampleRate);
  // avg. bytes/sec
  setUint32(abuffer.sampleRate * 2 * numOfChan);
  // block-align
  setUint16(numOfChan * 2);
  // 16-bit (hardcoded in this demo)
  setUint16(16);
  // "data" - chunk
  setUint32(0x61746164);
  // chunk length
  setUint32(length - pos - 4);

  // write interleaved data
  for (i = 0; i < abuffer.numberOfChannels; i++)
    channels.push(abuffer.getChannelData(i));

  while (pos < length) {
    // interleave channels
    for (i = 0; i < numOfChan; i++) {
      // clamp
      sample = Math.max(-1, Math.min(1, channels[i][offset]));
      // scale to 16-bit signed int
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      // write 16-bit sample
      view.setInt16(pos, sample, true);
      pos += 2;
    }
    // next source sample
    offset++;
  }

  // create Blob
  return new Blob([buffer], { type: "audio/wav" });

  function setUint16(data) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data) {
    view.setUint32(pos, data, true);
    pos += 4;
  }
}

export function bufferToMp3(audioBuffer) {
  const sampleRate = audioBuffer.sampleRate;
  const mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, 128); // 单通道、采样率、比特率
  const samples = audioBuffer.getChannelData(0); // 获取音频数据
  const buffer = [];

  const chunkSize = 1152; // 每个 chunk 的大小
  for (let i = 0; i < samples.length; i += chunkSize) {
    // 将音频数组切分成 chunks
    const chunk = samples.subarray(i, i + chunkSize);
    const mp3buf = mp3Encoder.encodeBuffer(chunk); // 编码处理
    if (mp3buf.length > 0) {
      buffer.push(mp3buf); // 将编码后的结果添加到缓冲区
    }
  }

  const result = mp3Encoder.flush(); // 完成编码
  if (result.length > 0) {
    buffer.push(result);
  }

  return new Blob(buffer, { type: "audio/mp3" }); // 返回 Blob 对象
}

// 防抖函数
export function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    // 清除上一个定时器
    clearTimeout(timeout);

    // 设置新的定时器
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
