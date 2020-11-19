import classNames from 'classnames/bind'

const Tile = ({ value }) => {
  const valuePadding = value.toString().padStart(4, '0')
  const colorClass = `color${valuePadding}-bg`
  const isBigValue = value / 1000 >= 1
  const tileClass = classNames(
    { 'grid-cell': true },
    { 'small-font': isBigValue },
    { [colorClass]: value > 0 },
    { [`content${valuePadding}`]: value > 0 },
    { 'content-novalue': value <= 0 },
  )
  return (
    <div className={tileClass}></div>
  )
}

export default Tile
