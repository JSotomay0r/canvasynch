document.addEventListener('DOMContentLoaded', e => {
    // randomize art work svg

    const PLACEHOLDER_SEL = '#artwork'
    const MIN_CELLS_QTY = 10 // minimum amount of cells in the x direction
    const MAX_CELL_SIZE = 50 // maximum cell size
    const XMLNS = 'http://www.w3.org/2000/svg'

    const phWdt = Number.parseFloat(UTILS.computeStyle(PLACEHOLDER_SEL, 'width'))
    const phHgt = Number.parseFloat(UTILS.computeStyle(PLACEHOLDER_SEL, 'height'))

    const placeholder = document.querySelector(PLACEHOLDER_SEL)
    if (!placeholder) return

    // image randomizer
    if (placeholder.matches('[data-artwork=img]')) {
        const max = 5
        const rnd = UTILS.getRandomInt(1, max)
        if (rnd < max) placeholder.src = `img/canvases/canvas-${rnd}.jpg`
        return
    }

    // video randomizer
    if (placeholder.matches('[data-artwork=video]')) {
        const max = 3
        const rnd = UTILS.getRandomInt(1, max)
        if (rnd > 1) placeholder.src = `media/canvases/canvas-${rnd}.mp4`
        placeholder.play()
        return
    }

    if (placeholder.matches('[data-artwork=map]')) {
        const mapCont = placeholder.querySelector('#map')
        mapCont.style.height = `${phHgt}px`
        mapCont.style.width = `${phWdt}px`
        mapCont.style.position = 'relative'
        mapCont.style.backgroundColor = '#009dc4'

        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { longitude, latitude } = coords
            new Datamap({
                element: mapCont,
                setProjection: function (element) {
                    var projection = d3.geo.equirectangular().center([longitude, latitude]).rotate([0, 0]).scale(1200)
                    var path = d3.geo.path().projection(projection)
                    return { path, projection }
                },
                fills: {
                    defaultFill: '#9dbd7a',
                },
                geographyConfig: {
                    highlightFillColor: '#6a8052',
                    highlightBorderColor: '#cccccc99',
                },
            })
        })

        return
    }

    // bauhaus canvas

    const cellSizeForMinCells = phWdt / MIN_CELLS_QTY
    const exceedsSize = phWdt / MIN_CELLS_QTY > MAX_CELL_SIZE
    const cell_size = exceedsSize ? phWdt / Math.floor(phWdt / MAX_CELL_SIZE) : cellSizeForMinCells
    const cell_qty_x = Math.ceil(phWdt / cell_size)
    const cell_qty_y = Math.ceil(phHgt / cell_size)

    const SHAPES = Object.freeze({
        CIRCLE: Symbol('circle'),
        ARC: Symbol('arc'),
        SQUARE: Symbol('square'),
        TRIANGLE: Symbol('triangle'),
        RECT: Symbol('rect'),
    })
    const COLORS = ['#e9194b', '#0082cd', '#ffc50c' /*'#fd7e14', '#dc3545', '#6610f2' */]

    const createSVG = (tag, attrs) => {
        const ele = document.createElementNS(XMLNS, tag)
        Object.entries(attrs).forEach(([k, v]) => ele.setAttribute(k, v))
        return ele
    }

    const getTransform = (x, y, rot) => {
        const rotation = `rotate(${90 * rot}, ${x * cell_size + cell_size / 2},  ${y * cell_size + cell_size / 2})`
        const translation = `translate(${x * cell_size}, ${y * cell_size})`
        return `${rotation} ${translation}`
    }

    const getStyle = (x, y, rot, fill) => {
        const isAltX = UTILS.getRandomFrom([true, false])
        const deltaTranslate = UTILS.getRandomInt(-4, 4)

        const values = {
            '--rot': rot,
            '--x': x,
            '--y': y,
            '--fill': fill,
            '--rot-alt': rot + UTILS.getRandomInt(1, 4),
            '--x-alt': x + (isAltX ? UTILS.getRandomInt(-4, 4) : 0),
            '--y-alt': y + (!isAltX ? UTILS.getRandomInt(-4, 4) : 0),
            '--fill-alt': UTILS.getRandomFrom(COLORS),
        }
        return Object.entries(values)
            .map(([k, v]) => `${k}:${v}`)
            .join(';')
    }

    const createShape = (shape, fill = 'red', x = 0, y = 0, rot = 0) => {
        const base = { fill: fill, style: getStyle(x, y, rot, fill), class: 'shape' }
        switch (shape) {
            case SHAPES.CIRCLE:
                return createSVG('circle', { ...base, cx: cell_size / 2, cy: cell_size / 2, r: cell_size / 2 })
            case SHAPES.ARC:
                return createSVG('path', {
                    ...base,
                    d: `M 0 ${cell_size / 2} A ${cell_size / 2} ${cell_size / 2} 0 0 1 ${cell_size} ${
                        cell_size / 2
                    } L 0 ${cell_size / 2} Z`,
                })
            case SHAPES.SQUARE:
                return createSVG('rect', { ...base, width: cell_size, height: cell_size })
            case SHAPES.TRIANGLE:
                return createSVG('path', { ...base, d: `M 0 0 h ${cell_size} v ${cell_size}` })
            case SHAPES.RECT:
                return createSVG('path', { ...base, d: `M 0 0 h ${cell_size / 2} v ${cell_size} h -${cell_size / 2}` })
            default:
                return createShape(SHAPES.SQUARE, fill, x, y, rot)
        }
    }

    const createRandomShape = (x = 0, y = 0) => {
        const fill = UTILS.getRandomFrom(COLORS)
        const rotation = UTILS.getRandomInt(0, 3)
        const shape = UTILS.getRandomFrom(Object.values(SHAPES))
        return createShape(shape, fill, x, y, rotation)
    }

    const svg = createSVG('svg', {
        id: 'artwork',
        height: phHgt,
        width: phWdt,
        xmlns: XMLNS,
        viewbox: `0 0 ${phWdt} ${phHgt}`,
        style: `--cell-size: ${cell_size}`,
    })
    const background = createSVG('rect', { height: phHgt, width: phWdt, fill: '#000' })
    svg.append(background)

    for (let x = 0; x <= cell_qty_x; x++) {
        for (let y = 0; y <= cell_qty_y; y++) {
            const shape = createRandomShape(x, y)
            svg.append(shape)
        }
    }

    placeholder.parentNode.insertBefore(svg, placeholder)
    placeholder.remove()

    const toggleAlt = (ele, force) => ele.classList.toggle('alt', force)

    const animate = () => {
        const shapes = document.querySelectorAll(`${PLACEHOLDER_SEL} .shape`)
        shapes.forEach(x => toggleAlt(x, false))
        const shuffled = [...shapes].sort(() => 0.5 - Math.random())
        const selected = shuffled.slice(0, 20)
        selected.forEach(x => toggleAlt(x, true))
    }

    setInterval(animate, 2000)
})
