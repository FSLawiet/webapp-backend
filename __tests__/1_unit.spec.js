const { average, time_delta } = require("../src/libs/business");

describe("1. Testes de unidade", () => {
  describe("1.1 Função de média de notas", () => {
    it("Uma média aí", () => {
      expect(parseFloat(average(6.5, 7.2, 8.4))).toBe(7.7);
    });
    it("Uma média aí", () => {
      expect(parseFloat(average(5.0, 6.0, 7.0))).toBe(6.3);
    });
    it("Uma média aí", () => {
      expect(parseFloat(average(5.0, 10.0, 10.0))).toBe(9.0);
    });
    it("Uma média aí", () => {
      expect(parseFloat(average(10.0, 10.0, 5.0))).toBe(7.5);
    });
  });
  describe("1.2 Função de diferença de tempo", () => {
    it("Um tempo ai", () => {
      expect(time_delta(7, 8, 9, 10)).toStrictEqual(122);
    });
    it("Um tempo ai", () => {
      expect(time_delta(7, 7, 7, 7)).toStrictEqual(1440);
    });
    it("Um tempo ai", () => {
      expect(time_delta(7, 10, 8, 9)).toStrictEqual(59);
    });
    it("Um tempo ai", () => {
      expect(time_delta(7, 10, 5, 9)).toStrictEqual(1319);
    });
    it("Um tempo ai", () => {
      expect(time_delta(7, 9, 7, 5)).toStrictEqual(1436);
    });
  });
});
