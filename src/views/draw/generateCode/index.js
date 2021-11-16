let layoutIndex = 0;
export function vueTemplate(str) {
  return `<template>
      ${str}
  </template>`
}

export function vueScript(str) {
  return `<script>
    ${str}
  </script>`
}

export function cssStyle(cssStr) {
  return `<style>
    ${cssStr}
  </style>`
}

const layouts = {
  rowFrame(scheme, index) {
    const config = scheme;
    let child = config.children.map((el, indexs) =>
      layouts[el.layout] && layouts[el.layout](el) || handleCChart(el, indexs)
    );
    let style = index === 0 ? 'width: 100vw; height: 100vh' : '';
    return `<div style="${style}" :style="${handleStyle(config.style)}" class="flex-view">
      ${child.join('\n')}
    </div>`
  },
}

function handleCChart(el, index) {
  const tag = el.layout;
  let data = handleStyle(el.style);
  layoutIndex++;
  return `<${tag} :styleOption="${data}" dataModel="${el.dataModel}" category="${el.category}" legend="${el.legend}" sql="${el.sql}" refName="${tag + layoutIndex}"></${tag}>`
}

function handleStyle(data) {
  let jsonObj = data;
  let keyValue = "";
  let jsonStr = "";
  for (let key in jsonObj) {
    keyValue += key + ':\'' + jsonObj[key] + '\',';
  }
  keyValue = keyValue.substring(0, keyValue.length - 1);
  jsonStr = "{" + keyValue + "}";
  return jsonStr;
}

function layoutBuilder(el) {
  return {
    layout: el.layout,
  }
}

/**
 * 组装html代码。【入口函数】
 * @param {Object} formConfig 整个表单配置 layouts, conf
 * @param {String} type 生成类型，文件或弹窗等  fileName, file
 */
export function makeUpHtml(formConfig, type) {
  const htmlList = []
  formConfig.layouts.forEach((el, index) => {
    htmlList.push(layouts[el.layout](el, index))
  })
  const htmlStr = htmlList.join('\n')
  return htmlStr
}
