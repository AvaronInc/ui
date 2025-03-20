export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      administrators: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "administrators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          created_at: string
          description: string
          id: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          id: string
          key_value: string
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key_value: string
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key_value?: string
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      app_settings: {
        Row: {
          category: string
          created_at: string
          id: string
          settings: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          settings?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          settings?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      app_users: {
        Row: {
          biometrics_enrolled: boolean | null
          created_at: string
          email: string
          id: string
          kyber_cert_hash: string | null
          last_login: string | null
          mfa_enabled: boolean | null
          name: string
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          biometrics_enrolled?: boolean | null
          created_at?: string
          email: string
          id?: string
          kyber_cert_hash?: string | null
          last_login?: string | null
          mfa_enabled?: boolean | null
          name: string
          role?: string
          status?: string
          updated_at?: string
        }
        Update: {
          biometrics_enrolled?: boolean | null
          created_at?: string
          email?: string
          id?: string
          kyber_cert_hash?: string | null
          last_login?: string | null
          mfa_enabled?: boolean | null
          name?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      cloud_providers: {
        Row: {
          created_at: string
          credentials: Json
          id: string
          name: string
          provider: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          credentials: Json
          id?: string
          name: string
          provider: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          credentials?: Json
          id?: string
          name?: string
          provider?: string
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string
          domain: string | null
          id: string
          logo_url: string | null
          name: string
          settings: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain?: string | null
          id?: string
          logo_url?: string | null
          name: string
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          settings?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      company_systems: {
        Row: {
          company_id: string
          config: Json | null
          created_at: string
          description: string | null
          id: string
          name: string
          status: string | null
          system_url: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          config?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: string | null
          system_url?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          config?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          system_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_systems_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      file_storage: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          last_modified: string
          name: string
          parent_id: string | null
          path: string[]
          permissions: string
          size: number
          type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          last_modified?: string
          name: string
          parent_id?: string | null
          path: string[]
          permissions: string
          size: number
          type: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          last_modified?: string
          name?: string
          parent_id?: string | null
          path?: string[]
          permissions?: string
          size?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_storage_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "file_storage"
            referencedColumns: ["id"]
          },
        ]
      }
      health_checks: {
        Row: {
          checked_at: string
          created_at: string
          id: string
          metrics: Json
          server_id: string | null
          status: string
        }
        Insert: {
          checked_at?: string
          created_at?: string
          id?: string
          metrics: Json
          server_id?: string | null
          status: string
        }
        Update: {
          checked_at?: string
          created_at?: string
          id?: string
          metrics?: Json
          server_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_checks_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_settings: {
        Row: {
          category: string
          created_at: string
          id: string
          organization_id: string
          settings: Json
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          organization_id: string
          settings?: Json
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          organization_id?: string
          settings?: Json
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_events: {
        Row: {
          action_taken: string | null
          affected_device: string | null
          created_at: string
          description: string
          event_type: string
          id: string
          severity: string
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action_taken?: string | null
          affected_device?: string | null
          created_at?: string
          description: string
          event_type: string
          id?: string
          severity: string
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action_taken?: string | null
          affected_device?: string | null
          created_at?: string
          description?: string
          event_type?: string
          id?: string
          severity?: string
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      server_credentials: {
        Row: {
          access_type: string | null
          created_at: string
          description: string | null
          id: string
          ipmi_address: string | null
          password: string
          port: string | null
          server_id: string | null
          updated_at: string
          username: string
        }
        Insert: {
          access_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          ipmi_address?: string | null
          password: string
          port?: string | null
          server_id?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          access_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          ipmi_address?: string | null
          password?: string
          port?: string | null
          server_id?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_credentials_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_optimizations: {
        Row: {
          applied_at: string | null
          applied_changes: Json | null
          created_at: string
          id: string
          metrics: Json
          recommendations: string
          server_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          applied_at?: string | null
          applied_changes?: Json | null
          created_at?: string
          id?: string
          metrics: Json
          recommendations: string
          server_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          applied_at?: string | null
          applied_changes?: Json | null
          created_at?: string
          id?: string
          metrics?: Json
          recommendations?: string
          server_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_optimizations_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      servers: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          last_maintenance: string | null
          name: string
          specs: Json | null
          status: Database["public"]["Enums"]["server_status"]
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          last_maintenance?: string | null
          name: string
          specs?: Json | null
          status?: Database["public"]["Enums"]["server_status"]
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          last_maintenance?: string | null
          name?: string
          specs?: Json | null
          status?: Database["public"]["Enums"]["server_status"]
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      terms_acceptance: {
        Row: {
          accepted_at: string
          id: string
          ip_address: string | null
          service_type: string
          terms_version: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          accepted_at?: string
          id?: string
          ip_address?: string | null
          service_type: string
          terms_version: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          accepted_at?: string
          id?: string
          ip_address?: string | null
          service_type?: string
          terms_version?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ticket_notes: {
        Row: {
          author: string | null
          content: string
          created_at: string
          id: string
          is_internal: boolean
          ticket_id: string
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string
          id?: string
          is_internal?: boolean
          ticket_id: string
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string
          id?: string
          is_internal?: boolean
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_notes_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string | null
          description: string
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          priority: string
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          company_id: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_records: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vpn_sessions: {
        Row: {
          created_at: string
          device_id: string
          end_time: string | null
          id: string
          ip_address: string
          location: string | null
          start_time: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_id: string
          end_time?: string | null
          id?: string
          ip_address: string
          location?: string | null
          start_time?: string
          status: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_id?: string
          end_time?: string | null
          id?: string
          ip_address?: string
          location?: string | null
          start_time?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admin_role: "Super Admin" | "Admin"
      server_status: "running" | "stopped" | "maintenance" | "error"
      user_role: "admin" | "manager" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
