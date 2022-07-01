"use strict";
const { average, time_delta } = require("../libs/business");
const { StudentModel, ResultModel } = require("./models");
require("./connection");

module.exports = (app) => {
  app
    .route("/api/results")
    .post((req, res) => {
      //console.log(req.body);
      const { name, comment } = req.body;
      const quarter = parseInt(req.body.quarter);
      const grades = req.body.grades.map((x) => parseFloat(x));
      const dates = [new Date(req.body.dataI), new Date(req.body.dataF)];

      const average = average(grades[0], grades[1], grades[2]);
      const time_delta = time_delta(
        dates[0].getHours(),
        dates[0].getMinutes(),
        dates[1].getHours(),
        dates[1].getMinutes()
      );

      /*Checagens de parâmetros*/
      if (average > 10 || average < 0) {
        res.send("Notas Inválidas");
        return;
      }

      if (time_delta > 180 || time_delta < 1) {
        res.send("Datas Inválidas");
        return;
      }

      const index = (7 * average + 3 * (1 / time_delta)) / 10;

      const newResult = new ResultModel({
        quarter: quarter,
        grades: grades,
        average: average,
        time: dates,
        time_delta: time_delta,
        comment: comment,
        index: index,
      });

      const newStudent = new StudentModel({ name: name });
      newStudent.results.push(newResult);

      newStudent.save((err, data) => {
        if (err || !data) {
          res.send("Erro ao cadastrar aluno");
        } else {
          //console.log(newStudent);
          res.send(
            "Cadastro da(o) " + newStudent.name + " concluído com sucesso!"
          );
        }
      });
    })
    .get((req, res) => {
      if (req.query.best) {
        StudentModel.find()
          .sort({ "results.index": -1 })
          .limit(6)
          .exec((err, data) => {
            if (err || !data) {
              console.log(err);
            } else {
              //console.log("Lista de alunos:", data);
              for (let student of data) {
                for (let result of student.results) {
                  result.average = average(
                    result.grades[0],
                    result.grades[1],
                    result.grades[2]
                  );
                  result.time_delta = time_delta(
                    result.time[0].getHours(),
                    result.time[0].getMinutes(),
                    result.time[1].getHours(),
                    result.time[1].getMinutes()
                  );
                }
              }
              res.json(data);
            }
          });
      } else {
        StudentModel.find((err, data) => {
          if (err || !data) {
            console.log(err);
          } else {
            //console.log("Lista de alunos:", data);
            for (let student of data) {
              for (let result of student.results) {
                result.average = average(
                  result.grades[0],
                  result.grades[1],
                  result.grades[2]
                );
                result.time_delta = time_delta(
                  result.time[0].getHours(),
                  result.time[0].getMinutes(),
                  result.time[1].getHours(),
                  result.time[1].getMinutes()
                );
              }
            }
            res.json(data);
          }
        });
      }
    })
    .put((req, res) => {
      console.log(req.body);
      const { name, comment } = req.body;
      const quarter = parseInt(req.body.quarter);
      const grades = req.body.grades.map((x) => parseFloat(x));
      const dates = [new Date(req.body.dataI), new Date(req.body.dataF)];

      const average = average(grades[0], grades[1], grades[2]);
      const time_delta = time_delta(
        dates[0].getHours(),
        dates[0].getMinutes(),
        dates[1].getHours(),
        dates[1].getMinutes()
      );

      /*Checagens de parâmetros*/
      if (average > 10 || average < 0) {
        res.send("Notas Inválidas");
        return;
      }

      if (time_delta > 180 || time_delta < 1) {
        res.send("Datas Inválidas");
        return;
      }

      const index = (7 * average + 3 * (1 / time_delta)) / 10;

      StudentModel.findOne({ name: name }, (err, student) => {
        if (err || !student) {
          res.send("Erro: " + err);
        } else {
          const result = new ResultModel({
            quarter: quarter,
            grades: grades,
            average: average,
            time: dates,
            time_delta: time_delta,
            comment: comment,
            index: index,
          });

          let new_grade = true;

          for (let i = 0; i < student.results.length; i++) {
            if (student.results[i].quarter === result.quarter) {
              student.results[i] = result;
              new_grade = false;
              break;
            }
          }

          if (new_grade) student.results.push(result);

          student.save((err, data) => {
            if (err || !data) {
              console.log(err);
              res.send("Erro: " + err);
            } else {
              res.send("Nota alterada com sucesso!");
            }
          });
        }
      });
    })
    .delete((req, res) => {
      console.log(req.body);
      const { _id } = req.body;
      StudentModel.findByIdAndDelete(_id, (err, data) => {
        if (err || !data) {
          res.send("Erro ao excluir aluno");
        } else {
          res.send("Cadastro excluído com sucesso!");
        }
      });
    });
};
