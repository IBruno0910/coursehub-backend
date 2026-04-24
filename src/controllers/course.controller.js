const courseService = require("../services/course.service");

// Público
async function getPublishedCourses(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await courseService.getPublishedCoursesPaginated(
      page,
      limit,
      search
    );

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

// Admin
async function getAllCourses(req, res, next) {
  try {
    const courses = await courseService.getAllCourses();
    return res.json(courses);
  } catch (error) {
    next(error);
  }
}

// Admin
async function createCourse(req, res, next) {
  try {
    const { title, description, published } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const course = await courseService.createCourse({
      title,
      description,
      published: published ?? false,
      authorId: req.user.id,
    });

    return res.status(201).json(course);
  } catch (error) {
    next(error);
  }
}

async function getCourseById(req, res, next) {
  try {
    const { id } = req.params;

    const course = await courseService.getCourseById(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    return res.json(course);
  } catch (error) {
    next(error);
  }
}

async function updateCourse(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, published } = req.body;

    const course = await courseService.getCourseByIdRaw(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    if (req.user.role !== "ADMIN" && course.authorId !== req.user.id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    if (!title && !description && published === undefined) {
      return res.status(400).json({ message: "Nada para actualizar" });
    }

    const updatedCourse = await courseService.updateCourse(id, {
      title,
      description,
      published,
    });

    return res.json(updatedCourse);
  } catch (error) {
    next(error);
  }
}


async function deleteCourse(req, res, next) {
  try {
    const { id } = req.params;

    const course = await courseService.getCourseByIdRaw(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    if (req.user.role !== "ADMIN" && course.authorId !== req.user.id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await courseService.deleteCourse(id);

    return res.json({ message: "Curso eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}

async function getCourseFull(req, res) {
  try {
    const { id } = req.params;

    const course = await courseService.getCourseFull(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.json(course);
  } catch (error) {
    console.error("Get full course error:", error);
    res.status(500).json({
      message: "Error getting course"
    });
  }
}


module.exports = {
  getPublishedCourses,
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseFull
};
