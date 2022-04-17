module.exports = (req, res, next) => {
	//Если имеется уведомление, поместим его в контекст, затем удалим
	res.locals.flash = req.session.flash
	delete req.session.flash
	next()
}