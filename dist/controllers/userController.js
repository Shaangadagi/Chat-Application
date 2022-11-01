"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.login = exports.registerUser = void 0;
const config_1 = require("../config/config");
const userModel_1 = __importDefault(require("../models/userModel"));
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, userName, pno, email, password, confirmPassword, profile, role, } = req.body;
        const userEmail = yield userModel_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (userEmail == null) {
            if (fullName && userName && email && pno && password && confirmPassword || profile) {
                const hashedPassword = yield bcrypt.hash(password, 10);
                const hashedConfirmPassword = yield bcrypt.hash(confirmPassword, 10);
                if (password === confirmPassword) {
                    var user = yield userModel_1.default.create({
                        fullName,
                        userName,
                        email,
                        pno,
                        password: hashedPassword,
                        confirmPassword: hashedConfirmPassword,
                        role,
                        profile,
                        // token:jsonWebToken.sign({ userId: userEmail.id}, JWT_REGISTERKEY, {
                        //     expiresIn: REGISTER_TOKEN_EXPIRE,
                        // })
                    });
                    res.status(201).send({
                        user,
                        message: 'user created',
                    });
                }
                else {
                    res.status(400).send({
                        message: "Password And ConfirmPassword Doesn't Match",
                    });
                }
            }
            else {
                res.status(400).send({ message: 'All Fields All Required' });
            }
        }
        else {
            res.status(400).send({ message: 'Email Already Exist' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerUser = registerUser;
//login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            const user = yield userModel_1.default.findOne({
                where: { email },
            });
            if (user != null) {
                const passwordMatched = yield bcrypt.compare(password, user.password);
                //token
                const token = jsonWebToken.sign({ userId: user.id }, config_1.JWT_SCRETKEY, {
                    expiresIn: config_1.TOKEN_EXPIRE,
                });
                // token saved in cookie
                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 60000),
                    httpOnly: true,
                });
                if (user.email === email && passwordMatched) {
                    res.status(200).send({
                        message: 'Login successfully',
                        token,
                        userId: user.id,
                        fullName: user.fullName,
                        userName: user.userName,
                        email: user.email,
                        phone: user.pno,
                        role: user.role,
                        profile: user.profile
                    });
                }
            }
            else {
                res.status(400).send({ message: 'You Are NOt A Register User' });
            }
        }
        else {
            res.status(400).send({ message: 'All Fields All Required' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const keyword=req.query.search
    // const keyword=req.query.search?{
    //     where:  {
    //         [Op.or]: [
    //           {
    //             fullName: {
    //               [Op.like]: 'Boat%'
    //             }
    //           },
    //           {
    //             email: {
    //               [Op.like]: '%boat%'
    //             }
    //           }
    //         ]
    //       }
    // }
    const users = yield userModel_1.default.findAll({
        where: {
            [Op.or]: [
                {
                    fullName: {
                        [Op.regexp]: req.query.search,
                        // [Op.iLike]: `%${req.query.search}`,
                    }
                },
                {
                    email: {
                        [Op.regexp]: req.query.search,
                        // [Op.iLike]: `%${req.query.search}`,
                    }
                }
            ],
            [Op.and]: [
                {
                    id: {
                        [Op.ne]: req.user.id
                    }
                }
            ]
        }
    });
    res.send(users);
    // console.log(keyword)
});
exports.getAllUsers = getAllUsers;
module.exports = {
    registerUser: exports.registerUser,
    login: exports.login,
    getAllUsers: exports.getAllUsers
};
