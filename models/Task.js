// models/task.ts

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    status: {
        type: String
    }
}, {
    collection: 'tareas'
})

module.exports = mongoose.model('Task', TaskSchema)