const userModel = require("../modules/users/user.model");
const { verifyJWT } = require("./token");

const secureAPI = (sysRoles = []) => {
  return async (req, res, next) => {
    try {
      const { access_token = null } = req.headers;
      if (!access_token) throw new Error("Token is missing");
      const { data, exp } = verifyJWT(access_token);
      const currentTime = Math.ceil(Date.now() / 1000);
      if (currentTime > exp) throw new Error("Token expired");
      const { email } = data;
      const user = await userModel.findOne({
        email,
        isActive: true,
        isEmailVerified: true,
      });
      if (!user) throw new Error("User not found");
      if (sysRoles.length === 0) {
        req.currentUser = user?._id;
        next();
      } else {
        // RBAC AUTHORIZATION (Role Based Access Control)
        const isValidRole = sysRoles.some((role) => user?.roles.includes(role));
        if (!isValidRole) throw new Error("User unauthorized");
        // PBAC Authorization {admin: ["manage", 'create", "read", "delete", "write"]}
        // OAUTH, OAUTH 2.0
        req.currentUser = user?._id;
        next();
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports = { secureAPI };
