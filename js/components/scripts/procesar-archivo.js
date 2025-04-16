function procesarArchivoComponent() {
    return {
        file: null,
        error: '',
        loading: false,
        success: false,
        message: '',

        async procesarArchivo() {

            if (!this.file) {
                console.error('No hay archivo seleccionado');
                return;
              }

            const formData = new FormData();
            formData.append('archivo', this.file);
          
            try {
                const responnse = await api.post('/page/procesoarchivo/proceso', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } catch (error) {
                this.error = 'Error al procesar el archivo';
                console.error(error);
                return;
            }

            console.log('Contenido de FormData:');
            formData.forEach((value, key) => {
              console.log(`${key}:`, value);
            });


        },

        handleFileChange(event) {
            this.file = event.target.files[0];
        }
    }
}