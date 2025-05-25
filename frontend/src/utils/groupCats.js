export function groupCatsByLocation(cats) {
  return cats.reduce((acc, cat) => {
    const loc = cat.location.toLowerCase()
    const group = loc.includes('utown') ? 'UTown' :
                  loc.includes('engineering') ? 'Engineering' :
                  loc.includes('computing') || loc.includes('biz') ? 'Computing / Biz' :
                  loc.includes('science') ? 'Science' :
                  loc.includes('arts') || loc.includes('fass') ? 'Arts' :
                  loc.includes('temasek') ? 'Temasek' :
                  loc.includes('raffles') ? 'Raffles' :
                  'Others'
    if (!acc[group]) acc[group] = []
    acc[group].push(cat)
    return acc
  }, {})
}
