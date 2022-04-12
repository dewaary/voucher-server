
const Category = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const category = await Category.find()

            res.render('admin/category/view_category', {
                category,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error);
        }
    },
    viewCreate: async(req, res)=>{
        try {
            res.render('admin/category/create')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error);
        }
    },

    actionCreate: async(req, res)=>{
        try {
            const {name} = req.body

            let category = await Category({name})
            await category.save()

            req.flash('alertMessage', "Berhasil Menambahkan Kategori")
            req.flash('alertStatus', 'Success')

            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error);
        }
    },

    viewEdit: async(req, res)=>{
        try {
            const {id} = req.params

            const category = await Category.findOne({_id : id})

            res.render('admin/category/edit', {
                category
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error);
        }
    },

    actionEdit: async (req, res)=>{
        try {
            const {id} = req.params;
            const {name} = req.body

            await Category.findOneAndUpdate({
                _id : id
            }, {name})

           
            req.flash('alertMessage', "Berhasil Mengubah Kategori")
            req.flash('alertStatus', 'Success')


            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error);
        }
    },

    actionDelete: async (req, res)=>{
        try {
            const {id} = req.params;

            await Category.findOneAndRemove({
                _id : id
            })


            req.flash('alertMessage', "Berhasil Menghapus Kategori")
            req.flash('alertStatus', 'Success')

            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error);
        }
    }
}