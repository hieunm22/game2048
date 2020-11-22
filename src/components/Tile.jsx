import classNames from 'classnames/bind'

const Tile = ({ value, isNewTile }) => {
  const valuePadding = value.toString().padStart(4, '0')
  const colorClass = `color${valuePadding}-bg`
  const isBigValue = value / 1000 >= 1
  const containerClass = classNames(
    { 'tile-container': true },
    { [colorClass]: value > 0 },
    { 'content-novalue': value <= 0 },
  )
  const childClass = classNames(
    { 'grid-cell': !isNewTile && !isBigValue },
    { 'small-font': isBigValue },
    { 'new-tile': isNewTile },
    { 'color24': value === 2 || value === 4 },
    { 'color-over4': value > 4 },
    { [`content${valuePadding}`]: value > 0 },
  )
  return (
    <div className={containerClass}>
      {value > 0 && <div className={childClass}></div>}
    </div>
  )
}

export default Tile
