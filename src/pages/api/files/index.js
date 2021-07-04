export default function handler(req, res) {
    res.status(200)
    .json({
        html:'<h1>Holi</h1>',
        css: 'h1{color: red;}',
        javascript: ' '
    
    })
  }