/// <reference types="cypress" />
import users from "../../fixtures/users.json";

describe("pet store API", () => {
  it("create user", () => {
    cy.create_user("https://petstore.swagger.io/v2/user", users.user1).then(
      (response) => {
        expect(response.status).be.eql(200);
        expect(response.body).be.eql({
          code: 200,
          message: users.user1.id.toString(),
          type: "unknown",
        });
      }
    );
  });

  it("update user", () => {
    cy.create_user("https://petstore.swagger.io/v2/user", users.user2).then(
      (response) => {
        expect(response.status).be.eql(200);
        expect(response.body).be.eql({
          code: 200,
          message: users.user2.id.toString(),
          type: "unknown",
        });

        cy.update_user_info(users.updated_user2).then((response) => {
          expect(response.status).be.eql(200);
          expect(response.body).be.eql({
            code: 200,
            message: users.user2.id.toString(),
            type: "unknown",
          });
        });

        cy.find_user(users.user2.username).then((response) => {
          expect(response.status).be.eql(200);
          expect(response.body).be.eql(users.updated_user2);
        });
      }
    );
  });

  it("delete user", () => {
    cy.create_user("https://petstore.swagger.io/v2/user", users.user3).then(
      (response) => {
        expect(response.status).be.eql(200);
        expect(response.body).be.eql({
          code: 200,
          message: users.user3.id.toString(),
          type: "unknown",
        });

        cy.find_user(users.user3.username).then((response) => {
          expect(response.status).be.eql(200);
          expect(response.body).be.eql(users.user3);
        });

        cy.delete_user(users.user3.username).then((response) => {
          expect(response.status).be.eq(200);
        });

        cy.find_user(users.user3.username).then((response) => {
          expect(response.status).be.eq(404);
          expect(response.body).be.eql({
            code: 1,
            type: "error",
            message: "User not found",
          });
        });
      }
    );
  });
});
