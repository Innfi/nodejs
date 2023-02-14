import 'reflect-metadata';
import { RequestHandler, Router } from 'express';

enum HttpData {
  Path = 'path',
  Method = 'method'
}

enum HttpMethod {
  Get = 'get',
  Post = 'post',
}

function Controller(prefix: string) {
  return function (target: Function) {
    console.log(`Controller] start`);
    const router = Router();

    Object.keys(target.prototype).forEach((key: string) => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(HttpData.Path, target.prototype, key);
      const method: HttpMethod = Reflect.getMetadata(
        HttpData.Method,
        target.prototype,
        key,
      );

      console.log(routeHandler);
      console.log(path);
      console.log(method);

      if (path) {
        router[method](`${prefix}${path}`, routeHandler);
      }
    });

    console.log(`Controller] end`);
  }
}

interface RouteHandlerBase<T> extends TypedPropertyDescriptor<T> {
  handler?: RequestHandler;
}

function MethodDeco(method: HttpMethod) {
  return function(path: string) {
    return function(target: Object, propertyKey: string, descriptor: RouteHandlerBase<any>) {
      Reflect.defineMetadata(HttpData.Method, method, target, propertyKey);
      Reflect.defineMetadata(HttpData.Path, path, target, propertyKey);

      const original = descriptor.value!;
      descriptor.value = function(...args: any[]) {
        console.log(`before the call`);
        console.log(`args: ${args}`);
        return original.apply(target, args);
      }

      return descriptor;
    }
  }
}

const MethodGet = MethodDeco(HttpMethod.Get);
const MethodPost = MethodDeco(HttpMethod.Post);

@Controller('/innfi')
class TargetClass {
  @MethodGet('/')
  defaultGet(test: number) {
    console.log(`TargetClass.defaultGet() called`);
  }

  @MethodPost('/input')
  defaultPost(input: string) {
    console.log(`TargetClass.defaultPost(${input}) called`);
  }
}

const instance = new TargetClass();

instance.defaultGet(1234);
instance.defaultPost('abcd');