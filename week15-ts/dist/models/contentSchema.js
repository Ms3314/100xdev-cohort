"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var doctyp;
(function (doctyp) {
    doctyp[doctyp["document"] = 0] = "document";
    doctyp[doctyp["tweet"] = 1] = "tweet";
    doctyp[doctyp["youtube"] = 2] = "youtube";
    doctyp[doctyp["link"] = 3] = "link";
})(doctyp || (doctyp = {}));
const contentSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        enum: doctyp,
        require: true
    },
    title: {
        type: String,
        require: true,
    },
    tags: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Tag',
        }],
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});
const Content = mongoose_1.default.model('Content', contentSchema);
exports.default = Content;