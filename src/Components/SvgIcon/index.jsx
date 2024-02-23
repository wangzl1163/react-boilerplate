function isExternal(path) {
   return /^(https?:|mailto:|tel:)/.test(path)
}

export default function SvgIcon(props) {
   const { icon, className } = props
   const el = isExternal(icon) ? (
      <div
         style={{ mask: `url(${icon}) no-repeat 50% 50%`, '-webkit-mask': `url(${icon}) no-repeat 50% 50%` }}
         className="svg-external-icon svg-icon"
      ></div>
   ) : (
      <svg className={className ? 'svg-icon ' + className : 'svg-icon'} aria-hidden="true">
         <use xlinkHref={`#icon-${icon}`} />
      </svg>
   )
   return el
}
