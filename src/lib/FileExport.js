import FileSaver from 'file-saver'
import XLSX from 'xlsx'

function convert(columns, data) {
  const [ names, headers, formatters ] = columns.reduce((acc, element) => {
    const { name, header, formatter } = element

    acc[0].push(name)
    acc[1].push(header)
    acc[2].push(formatter || null)

    return acc
  }, [[], [], []])

  const convertData = [headers]
  for (const row of data) {
    const newRow = names.map((name, idx) => {
      const value = row[name] || ''
      const formatter = formatters.eq(idx)

      return value && formatter ? formatter({ value }) : `${value}`
    })
    convertData.push(newRow)
  }
  return convertData
}

export function exportExcel(filename, columns, data) {
  const convertData = convert(columns, data)
  const ws = XLSX.utils.aoa_to_sheet(convertData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, filename)
  const vbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
  try {
    FileSaver.saveAs(new Blob([vbout], { type: 'application/octet-stream' }), `${filename}.xlsx`)
  } catch (e) {
    console.error(e, vbout)
  }
  return vbout
}
