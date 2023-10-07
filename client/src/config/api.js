import axios from 'axios';
import config from '@/config/config.js';

export const HTTP = axios.create({
    baseURL: config.API,
});

export default {

    // ================================================================================= GET

    async getAllProduct() {
        try {

            const response = await HTTP.get("/product?page=1&limit=8&category=dresses");
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getAllProductCarouselComment() {
        try {

            const response = await HTTP.get("/product");
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getAllProductCarousel() {
        try {

            const response = await HTTP.get("/product?page=1&limit=4&category=clothing");
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getAllUser() {
        try {

            const response = await HTTP.get("/user/all-user");
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getWishlist() {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.get("/user/wishlist", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getCollections() {
        try {

            const response = await HTTP.get("/product");
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getSearchLimit() {
        try {

            const response = await HTTP.get("/product");
            return response.data;

        } catch (error) { 
            console.log("Error: ", error);
        };
    },

    async logoutUser() {
        try {
            
            const response = await HTTP.get("/user/logout");
            
            window.location.reload();

            return response.data;


        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getCart() {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.get("/user/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        }
    },

    async getAllBlog() {
        try {

            const response = await HTTP.get("/blog/all-blog");
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getBlogLimit() {
        try {

            const response = await HTTP.get("/blog/all-blog?page=1&limit=3");
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getBlog(blogId) {
        try {

            const response = await HTTP.get(`/blog/${blogId}`);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async getProductId(productId) {
        try {

            const response = await HTTP.get(`/product/${productId}`);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    // ================================================================================= POST

    async registeredForm(user) {
        try {

            const response = await HTTP.post("/user/register", user);

            const currentUser = {
                _id: response.data._id,
                firstname: response.data.firstname,
                username: response.data.username,
                avatar: response.data.avatar,
                token: response.data.token,
                refreshToken: response.data.refreshToken,
            }

            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            window.location.reload();

            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async loginForm(user) {
        try {

            const response = await HTTP.post("/user/login", user);

            const currentUser = {
                _id: response.data._id,
                firstname: response.data.firstname,
                username: response.data.username,
                avatar: response.data.avatar,
                token: response.data.token,
                refreshToken: response.data.refreshToken,
            }

            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            window.location.reload();
            
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async userContactUs(formDataToSend) {
        try {

            const response = await HTTP.post("/user/contact", formDataToSend);
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async userQuestion(formDataToQuestion) {
        try {

            const response = await HTTP.post("/user/question", formDataToQuestion);
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    // ================================================================================= PUT

    async updateUser(userName) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.put("/user/edit-user", userName, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async updatePasswordUser(updatePassword) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.put("/user/update-password", updatePassword, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            window.location.reload();

            return response.data;

        } catch (error) {
            console.log(error);
        };
    },

    async addToCart(productId) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.put(`/product/cart`, {
                prodId: productId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;

            window.location.reload();

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async addToWishlist(productId) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.put("/product/wishlist", {
                prodId: productId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async updateCartItemQuantity(productId, quantity) {
        try {

          const currentUserJSON = localStorage.getItem("currentUser");
          const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;
    
          const requestData = {
            productId,
            quantity,
          };
    
          const response = await HTTP.put(`/product/quantity/${productId}`, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          return response.data;
          

        } catch (error) {
          console.log("Error: ", error);
        }
    },

    async selectColorAndSize(productId, colorchose, sizechose) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const requestData = {
                productId,
                colorchose,
                sizechose,
            };

            const response = await HTTP.put(`/product/select/${productId}`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async reviewRating(productId, star, comment) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.put("/product/rating",
                {
                    prodId: productId,
                    star: star,
                    comment: comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            window.location.reload();
            
            return response.data;
            
            
        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async commentUser(blogId, comment) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.put("/blog/comment", 
            {
                blogId: blogId,
                comment: comment,
            }, 
            { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            window.location.reload();

            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },                                                                          

    // ================================================================================= DELETE

    async removeFromCartApi(itemId) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.delete("/product/remove", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

                data: {
                    prodId: itemId
                },
            });
            
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },

    async removeFromWishlistApi(itemId) {
        try {

            const currentUserJSON = localStorage.getItem("currentUser");
            const token = currentUserJSON ? JSON.parse(currentUserJSON).token : null;

            const response = await HTTP.delete("/product/remove-wishlist", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

                data: {
                    prodId: itemId
                },
            });
            
            return response.data;

        } catch (error) {
            console.log("Error: ", error);
        };
    },
};