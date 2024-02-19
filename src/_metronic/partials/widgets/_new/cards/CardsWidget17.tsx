/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useRef, useState } from 'react'
import { getCSSVariableValue } from '../../../../assets/ts/_utils'
import { useThemeMode } from '../../../layout/theme-mode/ThemeModeProvider'
import { ConfigModel, getConfigList } from '../../../../../app/pages/_requests/getConfigList'
import { VPSModel, getVPSList } from '../../../../../app/pages/_requests/getVPSList'
import { useAuth } from '../../../../../app/modules/auth'

const COLORS = ['#16a085', '#2980b9', '#8e44ad', '#2c3e50', '#d35400']


type Props = {
  className: string
  chartSize?: number
  chartLine?: number
  chartRotate?: number
}

const CardsWidget17: FC<Props> = ({
  className,
  chartSize = 70,
  chartLine = 11,
  chartRotate = 145,
}) => {

  const { auth } = useAuth()

  const [configList, setConfigList] = useState<ConfigModel[]>([])
  const [VPSList, setVPSList] = useState<VPSModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!auth) {
      return;
    }

    Promise.all([
      getConfigList(auth.data.token).then((response) => { setConfigList(response) }),
      getVPSList(auth.data.token).then((response) => { setVPSList(response.data) })
    ]).then(() => { setIsLoading(false) })

  }, [auth])

  const VPSPerConfig: Record<string, VPSModel[]> = VPSList.reduce((acc, current) => {

    if (!acc[configList.find(({ id }) => id === current.config_id)?.name ?? '']) {
      acc[configList.find(({ id }) => id === current.config_id)?.name ?? ''] = []
    }

    acc[configList.find(({ id }) => id === current.config_id)?.name ?? ''].push(current)

    return acc;
  }, {} as Record<string, VPSModel[]>)

  const chartRef = useRef<HTMLDivElement | null>(null)
  const { mode } = useThemeMode()
  useEffect(() => {
    refreshChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    setTimeout(() => {
      initChart(chartSize, chartLine, chartRotate, VPSList, configList, VPSPerConfig)
    }, 10)
  }

  return (
    <div className={`card card-flush ${className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <div className='d-flex align-items-center'>
            <span className='fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2'>{VPSList.length}</span>
            <span className='fs-4 fw-semibold text-gray-500 me-1 align-self-start'>VPS</span>
          </div>
          <span className='text-gray-500 pt-1 fw-semibold fs-6'>Total count</span>
        </div>
      </div>

      <div className='card-body pt-2 pb-4 d-flex flex-wrap align-items-center'>
        <div className='d-flex flex-center me-5 pt-2'>
          <div
            id='kt_card_widget_17_chart'
            ref={chartRef}
            style={{ minWidth: chartSize + 'px', minHeight: chartSize + 'px' }}
            data-kt-size={chartSize}
            data-kt-line={chartLine}
          ></div>
        </div>

        <div className='d-flex flex-column content-justify-center flex-row-fluid'>

          {Object.entries(VPSPerConfig).map(([configName, VPSPerConfig], i) => {

            return (<div className='d-flex fw-semibold align-items-center'>
              <div
                className='bullet w-8px h-3px rounded-2 me-3'
                style={{ backgroundColor: COLORS[i] }}
              ></div>
              <div className='text-gray-500 flex-grow-1 me-4'>{configName}</div>
              <div className=' fw-bolder text-gray-700 text-xxl-end'>{VPSPerConfig.length}</div>
            </div>)
          })}
        </div>
      </div>
    </div>
  )
}

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145,
  VPSList: VPSModel[], configList: ConfigModel[], VPSPerConfig: Record<string, VPSModel[]>
) {
  const el = document.getElementById('kt_card_widget_17_chart')
  if (!el) {
    return
  }
  el.innerHTML = ''

  const options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
    //percent:  el.getAttribute('data-kt-percent') ,
  }

  const canvas = document.createElement('canvas')
  const span = document.createElement('span')

  //@ts-ignore
  if (typeof G_vmlCanvasManager !== 'undefined') {
    //@ts-ignore
    G_vmlCanvasManager.initElement(canvas)
  }

  const ctx = canvas.getContext('2d')
  canvas.width = canvas.height = options.size

  el.appendChild(span)
  el.appendChild(canvas)


  ctx?.translate(options.size / 2, options.size / 2) // change center
  ctx?.rotate((-1 / 2 + options.rotate / 180) * Math.PI) // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2

  const drawCircle = function (color: string, lineWidth: number, percent: number) {
    percent = Math.min(Math.max(0, percent || 1), 1)
    if (!ctx) {
      return
    }

    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false)
    ctx.strokeStyle = color
    ctx.lineCap = 'round' // butt, round or square
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }




  let i = 0;
  let acc = VPSList.length

  for (let [configName, ConfigVPSList] of Object.entries(VPSPerConfig)) {
    acc += ConfigVPSList.length + acc
    drawCircle(COLORS[i], options.lineWidth, (VPSList.length / acc))
    i++
  }

}

export { CardsWidget17 }
