import { FechaRelativaPipe } from './fecha-relativa.pipe';

describe('FechaRelativaPipe', () => {
  let pipe: FechaRelativaPipe;

  beforeEach(() => {
    pipe = new FechaRelativaPipe();
  });

  it('deberia crearse correctamente', () => {
    expect(pipe).toBeTruthy();
  });

  it('deberia retornar "Hace un momento" para fechas recientes', () => {
    const ahora = new Date();
    const resultado = pipe.transform(ahora);
    expect(resultado).toBe('Hace un momento');
  });

  it('deberia retornar "Hace 1 minuto" para hace 1 minuto', () => {
    const fecha = new Date(Date.now() - 60 * 1000);
    const resultado = pipe.transform(fecha);
    expect(resultado).toBe('Hace 1 minuto');
  });

  it('deberia retornar "Hace X minutos" para varios minutos', () => {
    const fecha = new Date(Date.now() - 5 * 60 * 1000);
    const resultado = pipe.transform(fecha);
    expect(resultado).toBe('Hace 5 minutos');
  });

  it('deberia retornar "Hace 1 hora" para hace 1 hora', () => {
    const fecha = new Date(Date.now() - 60 * 60 * 1000);
    const resultado = pipe.transform(fecha);
    expect(resultado).toBe('Hace 1 hora');
  });

  it('deberia retornar "Hace X horas" para varias horas', () => {
    const fecha = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const resultado = pipe.transform(fecha);
    expect(resultado).toBe('Hace 3 horas');
  });

  it('deberia retornar "Hace 1 dia" para hace 1 dia', () => {
    const fecha = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const resultado = pipe.transform(fecha);
    expect(resultado).toBe('Hace 1 dia');
  });

  it('deberia aceptar strings de fecha ISO', () => {
    const fechaString = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const resultado = pipe.transform(fechaString);
    expect(resultado).toBe('Hace 2 minutos');
  });
});
