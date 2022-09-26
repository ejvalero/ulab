const express = require('express');
const pool = require('../../database/db');
const controller = require('../../controllers');
const { getBreadcrumbs } = require('../../lib/utils');
const router = express.Router();


// Constants
const internalError = '<code><b>Error</b>: Internal error, please try again later.</code>';



router.get(

  '/',
  
  async (req, res) => {

    try {
      
      const posts = await pool.query('SELECT * FROM posts');
        
      const outputPosts = posts.map(post => {
        const dateOpts = { year: 'numeric', month: 'long', day: 'numeric' }
        post.published_at = post.created_at.toLocaleDateString('es-ES', dateOpts);
        return post;
      });
  
      res.render(
        'client/blog',
        {
          first: outputPosts[0],
          posts: outputPosts.slice(1),
          layout: 'client',
          breadcrumbs: getBreadcrumbs(req)
        }
      );

    }

    catch(error) { res.send(internalError) }

  }

);




router.get(
  
  '/:id',
  
  async (req, res) => {

    try {

      const { id } = req.params;
      const post = await pool.query('SELECT * FROM posts WHERE slug = ?', [id]);
  
      const dateOpts = { year: 'numeric', month: 'long', day: 'numeric' }
      post[0].published_at = post[0].created_at.toLocaleDateString('es-ES', dateOpts);
  
      res.render(
        'client/blog/post',
        {
          post: post[0],
          layout: 'client',
          breadcrumbs: getBreadcrumbs(req),
        }
      );

    }

    catch(error) { res.send(internalError) }

  }

);




module.exports = router;