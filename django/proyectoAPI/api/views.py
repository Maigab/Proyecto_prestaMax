from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Cliente, Empleado, Prestamo
import json

# Create your views here.

# View Clientes
class ClienteView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = 0):
        if (id > 0):
            clientes = list(Cliente.objects.filter(id=id).values())
            if len(clientes) > 0:
                cliente = clientes[0]
                datos={'message':"Seccess",'clientes':cliente}
            else:
                datos = {'message':"Clientes not found"}
            return JsonResponse(datos)
        else: 
            clientes = list(Cliente.objects.values())
            if len(clientes)>0:
                datos={'message':"Seccess",'clientes':clientes}
            else:
                datos={'message':"Clientes not found"}
            return JsonResponse(datos)

    def post(self, request):
        #print(request.body)
        clientes = list(Cliente.objects.values())
        jd = json.loads(request.body)
        x = 0
        for cliente in clientes:
            if jd['correo'] == cliente['correo']:
                x = 1
        if (x==0):
        #jd = json.loads(request.body)
            Cliente.objects.create(name = jd['name'], apellidos = jd['apellidos'],
            fechaNacimiento = jd['fechaNacimiento'], rfc = jd['rfc'],
            correo = jd['correo'], telefono = jd['telefono'], password = jd['password'],
            rol = jd['rol'])
            datos = {'message':"Success"}
        else:
            datos={'message':"clientes not found"}
        return JsonResponse(datos)
        print(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        clientes = list(Cliente.objects.filter(id=id).values())
        if len(clientes) > 0:
            cliente=Cliente.objects.get(id=id)
            cliente.name=jd['name']
            cliente.apellidos = jd['apellidos']
            cliente.fechaNacimiento = jd['fechaNacimiento']
            cliente.rfc = jd['rfc']
            cliente.correo = jd['correo']
            cliente.telefono = jd['telefono']
            cliente.password = jd['password']
            cliente.rol = jd['rol']
            cliente.save()
            datos = {'message': "Success"}
        else:
            datos={'message':"clientes not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        clientes = list(Cliente.objects.filter(id=id).values())
        if len(clientes) > 0:
            Cliente.objects.filter(id=id).delete()
            datos = {'message': "Success"}
        else:
            datos={'message':"Clientes not found"}
        return JsonResponse(datos)
    
# View Empleados
class EmpleadoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = 0):
        if (id > 0):
            empleados = list(Empleado.objects.filter(id=id).values())
            if len(empleados) > 0:
                empleado = empleados[0]
                datos={'message':"Seccess",'empleados':empleado}
            else:
                datos = {'message':"Empleados not found"}
            return JsonResponse(datos)
        else: 
            empleados = list(Empleado.objects.values())
            if len(empleados)>0:
                datos={'message':"Seccess",'empleados':empleados}
            else:
                datos={'message':"Empleados not found"}
            return JsonResponse(datos)
        
    def post(self, request):
        #print(request.body)
        empleados = list(Empleado.objects.values())
        jd = json.loads(request.body)
        x = 0
        for empleado in empleados:
            if jd['correo'] == empleado['correo']:
                x = 1
        if (x==0):
        #jd = json.loads(request.body)
            Empleado.objects.create(name = jd['name'], apellidos = jd['apellidos'],
            fechaNacimiento = jd['fechaNacimiento'], rfc = jd['rfc'],
            correo = jd['correo'], telefono = jd['telefono'], password = jd['password'],
            rol = jd['rol'])
            datos = {'message':"Success"}
        else:
            datos={'message':"Empleados not found"}
        return JsonResponse(datos)
        print(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        empleados = list(Empleado.objects.filter(id=id).values())
        if len(empleados) > 0:
            empleado=Empleado.objects.get(id=id)
            empleado.name=jd['name']
            empleado.apellidos = jd['apellidos']
            empleado.fechaNacimiento = jd['fechaNacimiento']
            empleado.rfc = jd['rfc']
            empleado.correo = jd['correo']
            empleado.telefono = jd['telefono']
            empleado.password = jd['password']
            empleado.rol = jd['rol']
            empleado.save()
            datos = {'message': "Success"}
        else:
            datos={'message':"Empleados not found"}
        return JsonResponse(datos)
    
    def delete(self, request, id):
        empleados = list(Empleado.objects.filter(id=id).values())
        if len(empleados) > 0:
            Empleado.objects.filter(id=id).delete()
            datos = {'message': "Success"}
        else:
            datos={'message':"Empleados not found"}
        return JsonResponse(datos)
    
# View Prestamos
class PrestamoView(View):
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = 0):
        if (id > 0):
            prestamos = list(Prestamo.objects.filter(id=id).values())
            if len(prestamos) > 0:
                prestamo = prestamos[0]
                datos={'message':"Seccess",'Prestamos':prestamo}
            else:
                datos = {'message':"Prestamos not found"}
            return JsonResponse(datos)
        else: 
            prestamos = list(Prestamo.objects.values())
            if len(prestamos)>0:
                datos={'message':"Seccess",'prestamos':prestamos}
            else:
                datos={'message':"Prestamos not found"}
            return JsonResponse(datos)
        
    def post(self, request):
        print(request.body)
        jd = json.loads(request.body)
        Prestamo.objects.create(status = jd['status'], monto = jd['monto'],
            pagos = jd['pagos'], cliente_id = jd['cliente_id'])
        datos = {'message':"Success"}

        return JsonResponse(datos)
        print(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        prestamos = list(Prestamo.objects.filter(id=id).values())
        if len(prestamos) > 0:
            prestamo=Prestamo.objects.get(id=id)
            prestamo.status=jd['status']
            prestamo.monto = jd['monto']
            prestamo.pagos = jd['pagos']
            
            prestamo.cliente_id = jd['cliente_id']
            prestamo.save()
            datos = {'message': "Success"}
        else:
            datos={'message':"Prestamos not found"}
        return JsonResponse(datos)
    
    def delete(self, request, id):
        prestamos = list(Prestamo.objects.filter(id=id).values())
        if len(prestamos) > 0:
            Prestamo.objects.filter(id=id).delete()
            datos = {'message': "Success"}
        else:
            datos={'message':"Prestamos not found"}
        return JsonResponse(datos)