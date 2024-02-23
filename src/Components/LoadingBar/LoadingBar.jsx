import { useRef, useState } from 'react'

import './LoadingBar.less'

const prefixCls = 'loading-bar'

export default function LoadingBar({ color = 'primary', failedColor = 'error', height = 4 }) {
   const classes = useRef(prefixCls)
   const innerClasses = useRef([
      `${prefixCls}-inner`,
      {
         [`${prefixCls}-inner-color-primary`]: color === 'primary' && status === 'success',
         [`${prefixCls}-inner-failed-color-error`]: failedColor === 'error' && status === 'error'
      }
   ])
   const outerStyles = {
      height: `${height}px`
   }
   const styles = () => {
      const style = {
         width: `${percent}%`,
         height: `${height}px`
      }

      if (color !== 'primary' && status === 'success') {
         style.backgroundColor = color
      }

      if (failedColor !== 'error' && status === 'error') {
         style.backgroundColor = failedColor
      }

      return style
   }

   const [percent, setPercent] = useState(0)
   const [status, setStatus] = useState('success')
   const [show, setShow] = useState(false)

   return show ? (
      <div className={classes} style={outerStyles}>
         <div className={innerClasses} style={styles()}></div>
      </div>
   ) : null
}
