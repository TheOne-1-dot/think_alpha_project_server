const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Task description is required.'],
      trim: true,
    },
    Priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: [true, 'Task priority is required.'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required.'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  }, 
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Book = model('Book', bookSchema)

module.exports = Book
