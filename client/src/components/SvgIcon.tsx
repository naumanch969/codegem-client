import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SvgIconProps {
    svgContent: string;
    colors: Record<string, string>;
    width?: string;
    height?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ svgContent, colors, width, height }) => {
    const replaceColors = (svg: string, colors: Record<string, string>): string => {
        let updatedSvg = svg;

        // Replace colors in fill attributes
        Object.keys(colors).forEach(colorKey => {
            const colorValue = colors[colorKey];
            const regex = new RegExp(`fill="${colorKey}"`, 'g');
            updatedSvg = updatedSvg.replace(regex, `fill="${colorValue}"`);
        });

        // Add Tailwind styles to the SVG element itself
        const styleString = `width: ${width || '100%'}; height: ${height || 'auto'};`;
        updatedSvg = updatedSvg.replace('<svg ', `<svg style="${styleString}" `);

        return updatedSvg;
    };

    const updatedSvgContent = replaceColors(svgContent, colors);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: updatedSvgContent }}
            className="inline-block" // Adjust this as needed
        />
    );
};

export default SvgIcon;
