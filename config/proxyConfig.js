module.exports = {
    proxy:{
        '/server':{
            target:'http://127.0.0.1:4001',
            // target:'http://47.106.110.151',
            
            changeOrigin:true,
            pathRewrite: {
                '^/server': ''   //需要rewrite的,
            } 
        }
    }
}