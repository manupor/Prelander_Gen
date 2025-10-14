# Configuración de Variables de Entorno en Vercel

## 📋 Variables Requeridas

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables** y agrega las siguientes:

### 🔐 Supabase (REQUERIDO)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**¿Dónde encontrarlas?**
1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Click en **Settings** (⚙️) en el sidebar izquierdo
3. Click en **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 🤖 OpenAI (OPCIONAL - para AI Assistant)

```bash
OPENAI_API_KEY=sk-proj-...
```

**¿Dónde conseguirla?**
1. Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
2. Click en **Create new secret key**
3. Copia la key (empieza con `sk-proj-` o `sk-`)

**Nota:** Sin esta key, el AI Assistant mostrará un mensaje de configuración pero el resto de la app funcionará.

---

## 🚀 Pasos para Configurar en Vercel

### Opción 1: Desde la UI de Vercel

1. Ve a tu proyecto: https://vercel.com/dashboard
2. Click en tu proyecto **Prelander_Gen**
3. Click en **Settings** (arriba)
4. Click en **Environment Variables** (sidebar izquierdo)
5. Agrega cada variable:
   - **Key**: Nombre de la variable (ej: `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: El valor de tu Supabase/OpenAI
   - **Environments**: Selecciona **Production**, **Preview**, y **Development**
6. Click **Save**
7. Después de agregar todas, ve a **Deployments**
8. Click en los 3 puntos (...) del último deployment
9. Click **Redeploy**

### Opción 2: Desde Vercel CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Login
vercel login

# Agregar variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Pega tu URL cuando te lo pida

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Pega tu anon key cuando te lo pida

vercel env add OPENAI_API_KEY
# Pega tu OpenAI key cuando te lo pida (opcional)

# Redeploy
vercel --prod
```

---

## ✅ Verificar que Funciona

Después de configurar y redeploy:

1. **Verifica el build**: Debe completarse sin errores
2. **Prueba el sitio**: Ve a tu URL de Vercel
3. **Prueba el dashboard**: Intenta crear un sitio
4. **Prueba el demo**: Ve a `/demo` y crea un template
5. **Prueba el AI**: Abre el editor y click en el botón ⚡

---

## 🔍 Troubleshooting

### Error: "supabase client is not defined"
- ✅ Verifica que agregaste `NEXT_PUBLIC_SUPABASE_URL`
- ✅ Verifica que agregaste `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ Asegúrate que tienen el prefijo `NEXT_PUBLIC_`
- ✅ Redeploy después de agregar las variables

### Error: "AI Assistant is not configured"
- ℹ️ Esto es normal si no agregaste `OPENAI_API_KEY`
- ✅ Agrega la key si quieres usar el AI Assistant
- ✅ El resto de la app funciona sin esta key

### Build falla en Vercel
- ✅ Verifica que las variables estén en **Production**
- ✅ Verifica que no haya espacios extra en los valores
- ✅ Redeploy desde cero (Deployments → Redeploy)

---

## 📝 Ejemplo Completo

```bash
# En Vercel Environment Variables:

NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjM0NTY3OCwiZXhwIjoxOTI3OTIxNjc4fQ.abcdefghijklmnopqrstuvwxyz1234567890
OPENAI_API_KEY=sk-proj-1234567890abcdefghijklmnopqrstuvwxyz
```

---

## 🎯 Checklist Final

- [ ] `NEXT_PUBLIC_SUPABASE_URL` agregada
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` agregada
- [ ] `OPENAI_API_KEY` agregada (opcional)
- [ ] Variables aplicadas a Production, Preview, y Development
- [ ] Redeploy completado
- [ ] Build exitoso sin errores
- [ ] Sitio funciona correctamente

---

**¡Listo! Tu app debería funcionar perfectamente en Vercel.** 🚀✨
