from rest_framework import serializers
from .models import *


class WordSerializer(serializers.ModelSerializer):
    # meta lo usa por defecto el serializer
    class Meta:
        # Nuestro modelo a serializar
        model = Word
        # Usamos all para devolver todos los campos,
        # cuidado xq all devuelve el pk como id
        fields = '__all__'
        # Campos que serán de sólo lectura.
        # Cuidado xq al usar all en vez de pk podriamos
        # necesitar cambiarlo por id
        read_only_fields = ('pk',)


class CategorySerializer(serializers.ModelSerializer):
    # meta lo usa por defecto el serializer
    class Meta:
        # Nuestro modelo a serializar
        model = Category
        # Los campos que se podrán emplear.
        # En este ejemplo podemos ver que seleccionamos un numero
        # reducido de campos.
        fields = ('name',)