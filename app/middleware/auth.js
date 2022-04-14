module.exports = {
    isLoginAdmin : (req, res, next) => {
        if(req.session.user === null || req.session.user === undefined){
            req.flash('alertMessage', `Udah Login Cuyy, gak boleh AFK huhu`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        } else {
            next()
        }
    }
}