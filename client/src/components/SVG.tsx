import React from 'react'
import SvgIcon from './SvgIcon'


const SVG = ({ svg, width, height }: { svg: string, width?: string, height?: string }) => {
    return (
        <SvgIcon
            width={width}
            height={height}
            svgContent={svg}
            colors={{
                '#3f3d58': '#8C5E28',   // Copper
                '#6c63ff': '#B87333',   // Copper-Dark
                '#3f3d56': '#2C2C2C'    // Blackish
            }}
        />
    )
}

export default SVG