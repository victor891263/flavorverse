export default function handleAutoResize(e) {
    e.target.style.height = ''
    e.target.style.height = e.target.scrollHeight + 'px'
}
