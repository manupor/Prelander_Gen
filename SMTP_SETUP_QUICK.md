# 🚨 NO LLEGAN EMAILS - Configurar SMTP (5 minutos)

## ❌ Problema: Emails de confirmación no llegan

**CAUSA #1 (99% de los casos):** Supabase NO tiene SMTP configurado

---

## ✅ SOLUCIÓN RÁPIDA - Configurar Resend (GRATIS)

### **Paso 1: Crear cuenta en Resend**

1. Ve a: **https://resend.com/signup**
2. Regístrate (gratis, sin tarjeta)
3. Confirma tu email

### **Paso 2: Obtener API Key**

1. Dashboard de Resend → **API Keys**
2. Click **"Create API Key"**
3. Nombre: `Prelander Gen`
4. **Copia la key** (empieza con `re_...`)

### **Paso 3: Configurar en Supabase**

1. **Ve a tu Dashboard:**
   ```
   https://supabase.com/dashboard/project/nfinuiiqqjzejmczfiek/settings/auth
   ```

2. **Scroll down** hasta "SMTP Settings"

3. **Click "Enable Custom SMTP"**

4. **Llena estos campos:**

```
SMTP Host: smtp.resend.com
Port: 587
Sender email: noreply@resend.dev
Sender name: Prelander Gen

SMTP Username: resend
SMTP Password: [PEGA-AQUI-TU-RESEND-API-KEY]
```

5. **Click "Save"**

### **Paso 4: Probar**

1. Crea una cuenta nueva en tu app
2. El email debería llegar en **~30 segundos** ✅

---

## 🔍 Verificar si SMTP está configurado

**Ve a:**
```
https://supabase.com/dashboard/project/nfinuiiqqjzejmczfiek/settings/auth
```

**Busca "SMTP Settings":**

- ❌ Si dice **"Using Supabase Mail"** → NO ESTÁ CONFIGURADO (esta es la causa)
- ✅ Si dice **"Custom SMTP"** → Está configurado

---

## 📧 Opción 2: Usar Gmail (Si no quieres crear cuenta en Resend)

Si prefieres usar Gmail:

**1. Generar App Password:**
   - Ve a: https://myaccount.google.com/apppasswords
   - Crea nueva contraseña de aplicación
   - Cópiala

**2. Configurar en Supabase:**
```
SMTP Host: smtp.gmail.com
Port: 587
Sender email: tu-email@gmail.com
Sender name: Prelander Gen

SMTP Username: tu-email@gmail.com
SMTP Password: [APP-PASSWORD-GENERADA]
```

---

## 🎯 Por Qué No Funciona Sin SMTP

**Supabase NO envía emails automáticamente.** 

Por defecto usa "Supabase Mail" que es:
- ⚠️ Solo para testing/desarrollo
- ⚠️ Muy limitado (pocos emails por día)
- ⚠️ A menudo va a spam o no llega

**Necesitas tu propio SMTP para producción.**

---

## ✅ Una vez configurado:

1. Los emails de confirmación llegarán instantáneamente
2. Los emails de bienvenida funcionarán (con el webhook)
3. Todo el flujo estará completo

---

## 🐛 Si después de configurar SMTP no llega:

1. **Revisa spam/junk**
2. **Espera 2-3 minutos** (puede tardar un poco la primera vez)
3. **Revisa logs:** Dashboard → Logs → Auth Logs
4. **Intenta con otro email** (a veces el problema es el proveedor del email)

---

## 📊 Resumen:

| Paso | Estado |
|------|--------|
| Crear cuenta Resend | ⏳ Pendiente |
| Obtener API Key | ⏳ Pendiente |
| Configurar SMTP en Supabase | ⏳ Pendiente |
| Probar signup | ⏳ Pendiente |

---

**¿Ya tienes cuenta en Resend o prefieres crearla?** 

Si ya tienes la API key, solo dame y te ayudo a configurarlo.
