function roleMiddleware(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      const status='invalid'
      req.status=status
      return res.status(403).json({ msg: "Akses ditolak" });
      
    }
    next();
  };
}

module.exports=roleMiddleware