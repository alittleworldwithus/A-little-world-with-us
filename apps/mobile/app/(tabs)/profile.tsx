import { useState, useMemo, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import BiometricAuth from '@/components/BiometricAuth'
import { useTheme } from '@/context/ThemeContext'
import type { ThemeColors } from '@/context/ThemeContext'
import { sizes, type Sizes } from '@/design-tokens'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export default function ProfileScreen() {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const styles = useMemo(() => createStyles(colors, sizes, insets.top), [colors, insets.top])
  const { user, signOut } = useAuth()
  const [showBiometricAuth, setShowBiometricAuth] = useState(false)
  const [coupleName, setCoupleName] = useState('Our World')

  useEffect(() => {
    let active = true
    async function loadNames() {
      if (!user) return
      try {
        const { data: myProf } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
        const { data: link } = await supabase
          .from('couple_links')
          .select('couple_id, inviter_id, accepted_by, couples(name)')
          .or(`inviter_id.eq.${user.id},accepted_by.eq.${user.id}`)
          .eq('status', 'accepted')
          .maybeSingle()

        if (!active) return

        const coupleData = link?.couples as { name?: string | null } | null
        if (coupleData?.name?.trim()) {
          setCoupleName(coupleData.name.trim())
          return
        }

        const partnerId = link ? (link.inviter_id === user.id ? link.accepted_by : link.inviter_id) : null
        let partnerName = ''
        if (partnerId) {
          const { data: pProf } = await supabase.from('profiles').select('full_name').eq('id', partnerId).maybeSingle()
          partnerName = pProf?.full_name?.trim() || ''
        }

        const myName = myProf?.full_name?.trim() || ''
        if (myName && partnerName) {
          setCoupleName(`${myName} × ${partnerName}`)
        } else if (myName) {
          setCoupleName(myName)
        }
      } catch {
        // Fallback to default
      }
    }
    void loadNames()
    return () => {
      active = false
    }
  }, [user])

  const handleBiometricSuccess = () => {
    setShowBiometricAuth(false)
    // Handle successful biometric authentication
  }

  return (
    <View style={styles.container}>
      {showBiometricAuth ? (
        <BiometricAuth
          onSuccess={handleBiometricSuccess}
          onCancel={() => setShowBiometricAuth(false)}
        />
      ) : (
        <>
          <Text style={styles.eyebrow}>Profile</Text>
          <Text style={styles.title}>{coupleName}</Text>
          <Text style={styles.subtitle}>Shared home, secure memories, and quiet love rituals.</Text>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Relationship status</Text>
            <Text style={styles.cardValue}>Linked and protected</Text>
          </View>

          {user && (
            <View style={styles.metaCard}>
              <Text style={styles.cardLabel}>Signed in as</Text>
              <Text style={styles.metaValue}>{user.email ?? 'No email available'}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowBiometricAuth(true)}
          >
            <Text style={styles.secondaryButtonText}>Enable Biometric Auth</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => void signOut()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const createStyles = (colors: ThemeColors, sizes: Sizes, paddingTop: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop,
      paddingHorizontal: 20,
    },
    eyebrow: {
      color: colors.textSecondary,
      fontSize: sizes.text.xs,
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    title: {
      color: colors.textPrimary,
      fontSize: sizes.text.hLg,
      fontWeight: '700',
      marginBottom: 8,
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: sizes.text.body,
      lineHeight: 22,
      marginBottom: 22,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: sizes.radius.card,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      marginBottom: 16,
    },
    metaCard: {
      backgroundColor: colors.surface,
      borderRadius: sizes.radius.card,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      marginBottom: 20,
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      borderRadius: sizes.radius.btn,
      padding: 16,
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.accent1,
    },
    secondaryButtonText: {
      color: colors.accent1,
      fontSize: sizes.text.body,
      fontWeight: '600',
    },
    cardLabel: {
      color: colors.textSecondary,
      fontSize: sizes.text.xs,
      letterSpacing: 1.3,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    cardValue: {
      color: colors.textPrimary,
      fontSize: sizes.text.hSm,
      fontWeight: '600',
    },
    metaValue: {
      color: colors.textPrimary,
      fontSize: sizes.text.body,
      fontWeight: '500',
    },
    button: {
      backgroundColor: colors.accent1,
      borderRadius: sizes.radius.btn,
      paddingVertical: 14,
      alignItems: 'center',
    },
    buttonText: {
      color: colors.background,
      fontWeight: '700',
      fontSize: sizes.text.body,
    },
  })
