export function copyToClip(content: string | undefined) {
  if (!content) {
    return
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(content)
    return
  }
  const aux = document.createElement('textarea')
  // aux.setAttribute("value", content);
  aux.value = content
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
  console.log('复制成功')
}
