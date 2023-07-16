// Performs linear interpolation (lerp) between two hex colors
export function lerpHexColor(color1, color2, t) {
	// Parse the input colors into RGB format
	const rgb1 = paseHexOrRgb(color1);
	const rgb2 = paseHexOrRgb(color2);

	// Perform lerp on each RGB channel
	const r = lerp(rgb1.r, rgb2.r, t);
	const g = lerp(rgb1.g, rgb2.g, t);
	const b = lerp(rgb1.b, rgb2.b, t);
	const a = lerp(rgb1.a, rgb2.a, t);

	// Convert the interpolated RGB values back to a hex color
	return rgbToHex(Math.round(r), Math.round(g), Math.round(b), Math.round(a));
}

// Parses a color string that can be in hex or RGB format
function paseHexOrRgb(color) {
	if (color.includes('rgb') && color.includes('(') && color.includes(')') && color.includes(',')) {
		// Color is in RGB format
		return parseRgb(color);
	}
	if (color.includes('#')) {
		// Color is in hex format
		return parseHex(color);
	}
	console.log('Could not parse color', color);
	return { r: 0, g: 0, b: 0, a: 255 }; // Default to black with full opacity
}

// Parses an RGB color string and returns the RGB values as an object
function parseRgb(color) {
	const colorsParts = color.split('(')[1].split(')')[0];
	const colorValues = colorsParts.split(',');
	return {
		r: +colorValues[0].trim(), // Red value
		g: +colorValues[1].trim(), // Green value
		b: +colorValues[2].trim(), // Blue value
		a: colorValues[3] ? Math.round(+colorValues[3].trim() * 255) : 255, // Alpha value (optional)
	};
}

// Parses a hex color string and returns the RGB values as an object
function parseHex(color) {
	const hexWithoutHash = color.startsWith('#') ? color.slice(1) : color;
	const colorValues = [];
	for (let i = 0; i < hexWithoutHash.length; i += 2) {
		colorValues.push(parseInt(hexWithoutHash.slice(i, i + 2), 16));
	}

	return {
		r: colorValues[0], // Red value
		g: colorValues[1], // Green value
		b: colorValues[2], // Blue value
		a: colorValues[3] ? colorValues[3] : 255, // Alpha value (optional, defaults to 255)
	};
}

// Converts RGB values to a hex color string
function rgbToHex(r, g, b, a) {
	const componentToHex = (c) => {
		const hex = c.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${componentToHex(a)}`;
}

// Performs linear interpolation between two values
function lerp(value1, value2, t) {
	return value1 + (value2 - value1) * t;
}
