/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../index");
const Post = require("../models/post");

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe("Post", () => {
  // remove test posts before run test
  beforeEach(done => {
    Post.deleteOne({}, () => {
      done();
    });
  });

  describe("/POST post", () => {
    it("It should not save post without title", done => {
      const post = {
        title: "",
        content: "Test content"
      };

      chai
        .request(server)
        .post("/posts")
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("title");
          res.body.errors.title.should.have.property("kind").eql("required");
          done();
        });
    });

    it("It should not save post without content", done => {
      const post = {
        title: "Test title",
        content: ""
      };

      chai
        .request(server)
        .post("/posts")
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("content");
          res.body.errors.content.should.have.property("kind").eql("required");
          done();
        });
    });

    it("It should save post", done => {
      const post = {
        title: "Test title",
        content: "Test content"
      };

      chai
        .request(server)
        .post("/posts")
        .send(post)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("title").eql(post.title);
          res.body.should.have.property("content").eql(post.content);
          done();
        });
    });
  });

  describe("/PUT/:ID post", () => {
    it("It should not UPDATE post given by id with empty title", done => {
      const newPost = new Post({
        title: "Test post title",
        content: "test post content"
      });

      newPost.save((err, post) => {
        chai
          .request(server)
          .put(`/posts/${post.id}`)
          .send({
            title: "",
            content: "updated"
          })
          .end((errors, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Title is required");
            done();
          });
      });
    });

    it("It should not UPDATE post given by id with empty content", done => {
      const newPost = new Post({
        title: "Test post title",
        content: "test post content"
      });

      newPost.save((err, post) => {
        chai
          .request(server)
          .put(`/posts/${post.id}`)
          .send({
            title: "Updated",
            content: ""
          })
          .end((errors, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Content is required");
            done();
          });
      });
    });

    it("It should UPDATE post given by id", done => {
      const newPost = new Post({
        title: "Test post title",
        content: "test post content"
      });

      newPost.save((err, post) => {
        chai
          .request(server)
          .put(`/posts/${post.id}`)
          .send({
            title: "Updated"
          })
          .end((errors, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Post successful updated");
            res.body.should.have.property("_id").eql(post.id);
            res.body.should.have.property("title").eql("Updated");
            res.body.should.have.property("content").eql(post.content);
            done();
          });
      });
    });
  });

  describe("/GET get all posts", () => {
    it("It should GET empty array of posts", done => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/GET:ID post", () => {
    it("It should GET a post by the given id", done => {
      const newPost = new Post({
        title: "Test post title",
        content: "test post content"
      });

      newPost.save((err, post) => {
        chai
          .request(server)
          .get(`/posts/${post.id}`)
          .send(post)
          .end((errors, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("_id").eql(post.id);
            res.body.should.have.property("title").eql(post.title);
            res.body.should.have.property("content").eql(post.content);
            done();
          });
      });
    });
  });

  describe("/DELETE:ID post", () => {
    it("It should DELETE a post by the given id", done => {
      const newPost = new Post({
        title: "Test post title",
        content: "test post content"
      });

      newPost.save((err, post) => {
        chai
          .request(server)
          .delete(`/posts/${post.id}`)
          .end((errors, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Post successful deleted");
            done();
          });
      });
    });
  });
});
